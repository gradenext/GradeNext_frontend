import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
	generatePracticeQuestion,
	generateRevisionQuestion,
	submitAnswer,
} from "../services/quiz";
import { useNavigate } from "react-router-dom";

const useStore = create(
	persist(
		(set, get) => ({
			// auth
			token: null,
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
				});
				localStorage.removeItem("token");
				localStorage.removeItem("session_id");
				localStorage.removeItem("account_id");
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
			analytics: { session_stats: 0, max_streak: 0 },
			correctAnswer: false,
			usedHints: 0,
			avgTimeTaken: null,
			timeTaken: [],
			feedback: null,

			generateQuestion: async () => {
				set((state) => ({
					...state,
					loading: true,
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
				}
			},

			submitAnswer: async () => {
				try {
					set((state) => ({
						...state,
						isSubmitting: true,
						showExplanation: true,
					}));

					const { question_id, userAnswer } = get();

					const response = await submitAnswer(
						question_id,
						userAnswer
					);

					set((state) => ({
						...state,
						isSubmitting: false,
						showExplanation: true,
						analytics: response?.data,
					}));

					set((state) => ({
						...state,
						correctAnswer: response?.data?.correct_answer,
					}));
				} catch (error) {
					set((state) => ({ ...state, isSubmitting: false }));

					const err = error.response?.data || error;
					console.error("Submission failed:", err);
					throw new Error(err.message || "Failed to submit answer");
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

			setAvgTimeTaken: (time) => {
				set((state) => ({
					timeTaken: [...state.timeTaken, time],
				}));
			},

			setFeedBack: (value) => {
				set({ feedback: value });
			},

			exitQuiz: () => {
				// Store the reset function to run after navigation
				const resetState = () => {
					set({
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
						},
						isCorrect: false,
						correctAnswer: false,
						usedHints: 0,
						avgTimeTaken: null,
						timeTaken: [],
					});
				};

				window.addEventListener("unload", resetState, { once: true });
				window.location.href = "/dashboard";
			},

			reset: () =>
				set({
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
					},
					correctAnswer: false,
					usedHints: null,
					avgTimeTaken: null,
					timeTaken: [],
				}),
		}),
		{
			name: "store", // Name for localStorage
			storage: createJSONStorage(() => localStorage), // Uses localStorage for persistence
		}
	)
);

export default useStore;
