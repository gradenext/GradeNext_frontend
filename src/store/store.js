import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
	generatePracticeQuestion,
	generateRevisionQuestion,
	submitAnswer,
} from "../services/quiz";

const useStore = create(
	persist(
		(set, get) => ({
			// auth
			token: sessionStorage.getItem("token"),
			session_id: null,
			account_id: null,
			user: null,

			// Login function
			login: (token, session_id, account_id, user) => {
				set({ token, session_id, account_id, user });
			},

			// Logout function
			logout: async () => {
				set({
					token: null,
					session_id: null,
					account_id: null,
					user: null,
					quizQuestion: null,
					selectedSubject: null,
					selectedMode: null,
					loading: false,
					question_id: null,
					nextQuizQuestion: null,
					isNextQuestionLoading: false,
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
				});
				sessionStorage.removeItem("token");
				window.location.href = "/login";
			},

			selectedSubject: null,
			selectedMode: null,

			setSelectedSubject: (subjectId) => {
				set({ selectedSubject: subjectId });
			},

			setSelectedMode: (actionId) => {
				set({ selectedMode: actionId });
			},

			loading: false,
			question_id: null,
			quizQuestion: null,
			nextQuizQuestion: null,
			isNextQuestionLoading: false,
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
				set((state) => ({
					...state,
					loading: true,
					isNextQuestionLoading: true,
				}));
				try {
					const {
						session_id,
						user,
						selectedSubject,
						quizQuestion,
						nextQuizQuestion,
						selectedMode,
					} = get();

					// Determine which API function to use based on mode
					const generateFunction =
						selectedMode === "practice"
							? generatePracticeQuestion
							: generateRevisionQuestion;

					// Case 1: No current question - fetch both initial and next question
					if (!quizQuestion) {
						// Fetch initial question
						const initialResponse = await generateFunction(
							session_id,
							user.grade,
							selectedSubject
						);

						// Fetch next question in parallel for efficiency
						const nextResponse = await generateFunction(
							session_id,
							user.grade,
							selectedSubject
						);

						set((state) => ({
							...state,
							quizQuestion: initialResponse.data,
							question_id: initialResponse.data?.question_id,
							nextQuizQuestion: nextResponse.data,
							loading: false,
							isNextQuestionLoading: false,
						}));
					}
					// Case 2: Current question exists but no next question - fetch next question
					else if (!nextQuizQuestion) {
						set((state) => ({
							...state,
							isNextQuestionLoading: true,
						}));

						const response = await generateFunction(
							session_id,
							user.grade,
							selectedSubject
						);

						set((state) => ({
							...state,
							nextQuizQuestion: response.data,
							isNextQuestionLoading: false,
						}));
					}
					// Case 3: Both questions exist - move next to current and fetch new next question
					else {
						set((state) => ({
							...state,
							isNextQuestionLoading: true,
						}));

						// First move next question to current
						set((state) => ({
							...state,
							quizQuestion: state.nextQuizQuestion,
							question_id: state.nextQuizQuestion?.question_id,
							nextQuizQuestion: null,
						}));

						// Then fetch new next question
						const response = await generateFunction(
							session_id,
							user.grade,
							selectedSubject
						);

						set((state) => ({
							...state,
							nextQuizQuestion: response.data,
							isNextQuestionLoading: false,
						}));
					}
				} catch (error) {
					set((state) => ({
						...state,
						loading: false,
						isNextQuestionLoading: false,
					}));

					throw error;
				} finally {
					set({
						loading: false,
						isNextQuestionLoading: false,
					});
				}
			},

			submitAnswer: async () => {
				try {
					const state = get();
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
				});
			},
		}),
		{
			name: "store",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
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
			}),
		}
	)
);

export default useStore;
