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
      showPricing: true,

      setTooglePricing: (showPricing) => {
        set((state) => ({
          ...state,
          showPricing,
        }));
      },

      toogleShowUpgradeModal: (showUpgradeModal) => {
        set((state) => ({
          ...state,
          showUpgradeModal: showUpgradeModal,
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
            subscription: {
              ...user?.subscription,
              plan:
                user?.subscription?.plan === "enterprise"
                  ? "advanced"
                  : user?.subscription?.plan,
            },
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
          isFetchingMoreQuestions,
        } = get();

        const setSafe = (update) => set((state) => ({ ...state, ...update }));
        const generateFunction = getQuestionGenerator(selectedMode);

        // Internal helper: fetch 10 more questions safely
        const fetchMoreQuestions = async () => {
          if (get().isFetchingMoreQuestions) return;

          setSafe({ isFetchingMoreQuestions: true });

          try {
            const response = await generateFunction(
              session_id,
              user.grade,
              selectedSubject,
              selectedTopic?.topic_key
            );

            const moreQuestions = response?.data?.questions || [];

            if (moreQuestions.length > 0) {
              set((state) => ({
                nextQuizQuestion: [
                  ...(state.nextQuizQuestion || []),
                  ...moreQuestions,
                ],
              }));
            }
          } catch (err) {
            console.error("Error fetching more questions:", err);
          } finally {
            setSafe({ isFetchingMoreQuestions: false });
          }
        };

        try {
          setSafe({ loading: true });

          const currentQueue = [...(nextQuizQuestion || [])];

          // Case 1: First-time load — fetch initial batch
          if (!quizQuestion) {
            const response = await generateFunction(
              session_id,
              user.grade,
              selectedSubject,
              selectedTopic?.topic_key
            );

            const questions = response?.data?.questions || [];

            if (questions.length === 0) {
              setSafe({ loading: false });
              throw new Error("No questions received");
            }

            const [first, ...rest] = questions;

            setSafe({
              quizQuestion: first,
              question_id: first.question_id,
              nextQuizQuestion: rest,
              loading: false,
            });

            if (rest.length < 4) fetchMoreQuestions(); // non-blocking
            return;
          }

          // Case 2: Queue is empty, but a fetch is ongoing
          if (currentQueue.length === 0) {
            if (isFetchingMoreQuestions) {
              setSafe({ loading: false, isNextQuestionLoading: true });
              return;
            } else {
              await fetchMoreQuestions();
              setSafe({ loading: false, isNextQuestionLoading: true });
              return;
            }
          }

          // Case 3: Normal — shift next question into current
          const next = currentQueue.shift();

          setSafe({
            quizQuestion: next,
            question_id: next?.question_id,
            nextQuizQuestion: currentQueue,
            loading: false,
            isNextQuestionLoading: false,
          });

          // Refill if queue is running low
          if (currentQueue.length < 4 && !get().isFetchingMoreQuestions) {
            fetchMoreQuestions(); // don't await — just queue up
          }
        } catch (error) {
          setSafe({
            loading: false,
            isFetchingMoreQuestions: false,
            isNextQuestionLoading: false,
          });
          throw error;
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
        showPricing: state.showPricing,
      }),
    }
  )
);

export default useStore;
