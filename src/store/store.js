import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  generatePracticeQuestion,
  generateRevisionQuestion,
  generateTreasureQuestion,
  submitAnswer,
} from "../services/quiz";

function getQuestionGenerator(mode) {
  switch (mode) {
    case "practice":
      return generatePracticeQuestion;
    case "topic":
      return generateTreasureQuestion;
    case "revision":
      return generateRevisionQuestion;
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}

const useStore = create(
  persist(
    (set, get) => ({
      // auth
      token: sessionStorage.getItem("token"),
      session_id: null,
      account_id: null,
      user: null,
      user_stats: null,
      showUpgradeModal: false,

      toogleShowUpgradeModal: () => {
        set((state) => ({
          ...state,
          showUpgradeModal: !state.showUpgradeModal,
        }));
      },

      // Login function
      login: (token, account_id) => {
        set({ token, account_id });
      },

      setUserData: (user, user_stats) => {
        set({
          user: {
            ...user,
            plan: user.plan || "basic",
          },
          user_stats,
        });
      },

      setSession: (session_id = null) => {
        set({
          session_id: session_id ? session_id : null,
        });
      },

      // Logout function
      logout: async () => {
        set({
          token: null,
          session_id: null,
          account_id: null,
          user: null,
          user_stats: null,
          selectedSubject: null,
          selectedMode: null,
          selectedTopic: null,
          loading: false,
          isNextQuestionLoading: false,
          question_id: null,
          quizQuestion: null,
          nextQuizQuestion: [],
          showExplanation: false,
          isSubmitting: false,
          userAnswer: null,
          analytics: {
            session_stats: {
              correct: 0,
              incorrect: 0,
            },
            max_streak: 0,
          },
          correctAnswer: false,
          usedHints: 0,
          avgTimeTaken: 0,
          timeTaken: [],
          feedback: null,
          questionLoadedAt: null,
          exitModal: {
            timerExpired: false,
            showModal: false,
          },
        });
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      },

      selectedSubject: null,
      selectedMode: null,
      selectedTopic: null,

      setSelectedSubject: (subjectId) => {
        set({ selectedSubject: subjectId });
      },

      setSelectedMode: (actionId) => {
        set({ selectedMode: actionId });
      },
      setSelectedTopic: (topic_key) => {
        set({ selectedTopic: topic_key });
      },

      loading: false,
      question_id: null,
      quizQuestion: null,
      nextQuizQuestion: null,
      isNextQuestionLoading: false,
      isFetchingMoreQuestions: false,
      showExplanation: false,
      isSubmitting: false,
      userAnswer: null,
      analytics: {
        session_stats: {
          correct: 0,
          incorrect: 0,
        },
        max_streak: 0,
        current_streak: 0,
      },
      correctAnswer: false,
      usedHints: 0,
      avgTimeTaken: 0,
      timeTaken: [],
      feedback: null,
      questionLoadedAt: null,
      exitModal: {
        timerExpired: false,
        showModal: false,
      },
      expiryTime: null,

      setExpiryTime: (time) => set({ expiryTime: time }),

      setExitModal: (a, b) => {
        const { exitModal } = get();

        if (exitModal?.timerExpired) {
          return;
        }
        set({
          exitModal: {
            showModal: a,
            timerExpired: b !== undefined && b,
          },
        });
      },

      setQuestionLoadedAt: (time) => {
        set({ questionLoadedAt: time });
      },

      generateQuestion: async () => {
        const {
          session_id,
          user,
          selectedSubject,
          selectedMode,
          selectedTopic,
          quizQuestion,
          nextQuizQuestion,
        } = get();

        const setSafe = (update) => set((state) => ({ ...state, ...update }));

        const generateFunction = getQuestionGenerator(selectedMode);

        try {
          setSafe({ loading: true });

          // Helper to fetch and append 10 questions
          const fetchMoreQuestions = async () => {
            if (get().isFetchingMoreQuestions) return;

            setSafe({ isFetchingMoreQuestions: true });
            const response = await generateFunction(
              session_id,
              user.grade,
              selectedSubject,
              selectedTopic?.topic_key
            );

            const moreQuestions = response.data?.questions || [];

            set((state) => ({
              nextQuizQuestion: [
                ...(state.nextQuizQuestion || []),
                ...moreQuestions,
              ],
              isFetchingMoreQuestions: false,
            }));
          };

          // Case 1: First time — fetch 10 questions
          if (!quizQuestion) {
            const response = await generateFunction(
              session_id,
              user.grade,
              selectedSubject,
              selectedTopic?.topic_key
            );
            const questions = response.data?.questions || [];

            if (questions.length === 0) {
              throw new Error("No questions received");
            }

            const [first, ...rest] = questions;

            setSafe({
              quizQuestion: first,
              question_id: first.question_id,
              nextQuizQuestion: rest,
              loading: false,
            });

            // Prefetch if low
            if (rest.length < 3) await fetchMoreQuestions();

            return;
          }

          // Case 2: Use next question from array
          const currentQueue = [...(nextQuizQuestion || [])];

          if (currentQueue.length === 0) {
            throw new Error("No more questions available");
          }

          const next = currentQueue.shift();

          setSafe({
            quizQuestion: next,
            question_id: next?.question_id,
            nextQuizQuestion: currentQueue,
            loading: false,
          });

          // Refill queue if fewer than 3 left
          if (currentQueue.length < 3) {
            await fetchMoreQuestions();
          }
        } catch (error) {
          setSafe({
            loading: false,
            isNextQuestionLoading: false,
            isFetchingMoreQuestions: false,
          });
          throw error;
        } finally {
          setSafe({ loading: false });
        }
      },

      submitAnswer: async () => {
        const state = get();
        try {
          if (state?.correctAnswer) {
            await state.moveToNext();
            return;
          }

          set({
            isSubmitting: true,
            showExplanation: true,
          });

          // Calculate time taken
          const timeTaken = state.questionLoadedAt
            ? (Date.now() - state.questionLoadedAt.getTime()) / 1000
            : 0;

          // Submit answer
          const response = await submitAnswer(
            state.question_id,
            state.userAnswer
          );

          // Update all state at once to prevent multiple renders
          set((prev) => {
            const newTimeTaken = [...prev.timeTaken, timeTaken];
            const newAverage =
              newTimeTaken.length > 0
                ? newTimeTaken.reduce((a, b) => a + b, 0) / newTimeTaken.length
                : 0;

            return {
              ...prev,
              isSubmitting: false,
              showExplanation: true,
              analytics: response?.data,
              correctAnswer: response?.data?.correct_answer,
              timeTaken: newTimeTaken,
              avgTimeTaken: newAverage,
              questionLoadedAt: null,
            };
          });
        } catch (error) {
          if (
            error?.response?.data?.error ===
            "Invalid or already answered question"
          ) {
            await state.moveToNext();
          }
          set({
            isSubmitting: false,
            showExplanation: false,
          });
          throw error;
        }
      },

      moveToNext: () => {
        const { generateQuestion } = get();
        set((state) => ({
          ...state,
          userAnswer: null,
          correctAnswer: null,
          showExplanation: false,
        }));
        generateQuestion();
      },

      setUserAnswer: (userAnswer) => {
        set({ userAnswer });
      },

      clearUserAnswer: () => {
        set((state) => ({ ...state, userAnswer: null }));
      },

      setUsedHints: () => {
        set((state) => ({
          usedHints: state.usedHints + 1,
        }));
      },

      setFeedBack: (value) => {
        set({ feedback: value });
      },

      exitQuiz: () => {
        set({
          loading: false,
          question_id: null,
          quizQuestion: null,
          nextQuizQuestion: null,
          isNextQuestionLoading: false,
          showExplanation: false,
          isSubmitting: false,
          userAnswer: null,
          isCorrect: false,
          correctAnswer: false,
          usedHints: 0,
          avgTimeTaken: 0,
          timeTaken: [],
          selectedTopic: null,
          selectedMode: null,
          selectedSubject: null,
          exitModal: {
            timerExpired: false,
            showModal: false,
          },
          analytics: {
            session_stats: {
              correct: 0,
              incorrect: 0,
            },
            max_streak: 0,
            current_streak: 0,
          },
          questionLoadedAt: null,
          expiryTime: null,
        });
      },
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedSubject: state.selectedSubject,
        selectedMode: state.selectedMode,
        selectedTopic: state.selectedTopic,
        question_id: state.question_id,
        quizQuestion: state.quizQuestion,
        nextQuizQuestion: state.nextQuizQuestion,
        userAnswer: state.userAnswer,
        analytics: state.analytics,
        correctAnswer: state.correctAnswer,
        usedHints: state.usedHints,
        avgTimeTaken: state.avgTimeTaken,
        timeTaken: state.timeTaken,
        feedback: state.feedback,
        questionLoadedAt: state.questionLoadedAt,
        token: state.token,
        session_id: state.session_id,
        account_id: state.account_id,
        user: state.user,
        user_stats: state.user_stats,
        exitModal: state.exitModal,
        expiryTime: state.expiryTime,
        showUpgradeModal: state.showUpgradeModal,
      }),
    }
  )
);

export default useStore;
