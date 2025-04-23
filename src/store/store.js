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

			// Login function
			login: (token, session_id, account_id, user, user_stats) => {
				set({ token, session_id, account_id, user, user_stats });
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
					question_id: null,
					quizQuestion: null,
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
				} = get();

				set((state) => ({
					...state,
					loading: true,
				}));

				try {
					// Determine which API function to use based on mode
					const generateFunction = getQuestionGenerator(selectedMode);

					const initialResponse = await generateFunction(
						session_id,
						user.grade,
						selectedSubject,
						selectedTopic?.topic_key
					);

					set((state) => ({
						...state,
						quizQuestion: initialResponse.data,
						question_id: initialResponse.data?.question_id,
						loading: false,
					}));
				} catch (error) {
					set((state) => ({
						...state,
						loading: false,
					}));

					console.log(error);
				} finally {
					set({
						loading: false,
					});
				}
			},

			submitAnswer: async () => {
				const state = get();
				try {
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
								? newTimeTaken.reduce((a, b) => a + b, 0) /
								  newTimeTaken.length
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

					console.log(error);
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
			}),
		}
	)
);

export default useStore;
