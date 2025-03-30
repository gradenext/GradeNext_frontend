import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { logout } from "../services/auth";
import { generateQuestion, submitAnswer } from "../services/quiz";

const useStore = create(
	persist(
		(set, get) => ({
			token: null,
			session_id: null,
			account_id: null,
			user: null,
			selectedSubject: null,
			selectedMode: null,
			quizQuestion: null,
			userAnswer: null,
			analytics: null,
			usedHints: null,
			avgTimeTaken: null,
			timeTaken: [],
			loading: false,
			question_id: null,
			feedback: null,
			isCorrect: false,
			isSubmitting: false,

			// Login function
			login: (token, session_id, account_id, user) => {
				set({ token, session_id, account_id, user });
			},

			// Logout function
			logout: async () => {
				// await logout();

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

			setSelectedSubject: (subjectId) => {
				set({ selectedSubject: subjectId });
			},

			setSelectedMode: (actionId) => {
				set({ selectedMode: actionId });
			},

			generatePracticeQuestion: async () => {
				try {
					set((state) => ({ ...state, loading: true }));

					const { session_id, user, selectedSubject } = get();

					const response = await generateQuestion(
						session_id,
						user.grade,
						selectedSubject
					);

					set((state) => ({
						...state,
						quizQuestion: response.data,
						question_id: response?.data?.question_id,
						loading: false,
					}));
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
					throw error;
				}
			},

			submitAnswer: async () => {
				try {
					set((state) => ({ ...state, isSubmitting: true }));

					const {
						question_id,
						userAnswer,
						generatePracticeQuestion,
					} = get();

					const response = await submitAnswer(
						question_id,
						userAnswer
					);

					set((state) => ({
						...state,
						userAnswer: null,
						isSubmitting: false,
					}));

					await generatePracticeQuestion();
				} catch (error) {
					set((state) => ({ ...state, isSubmitting: false }));

					const err = error.response?.data || error;
					console.error("Submission failed:", err);
					throw new Error(err.message || "Failed to submit answer");
				}
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

			setAnalytics: (analytics) => {
				set({ analytics });
			},

			setAvgTimeTaken: (time) => {
				set((state) => ({
					timeTaken: [...state.timeTaken, time],
				}));
			},

			setLoading: () => {
				set((state) => ({ ...state, loading: !state.loading }));
			},

			setFeedBack: (value) => {
				set({ feedback: value });
			},

			setIsCorrect: () => {
				set((state) => ({ ...state, isCorrect: !state.isCorrect }));
			},
		}),
		{
			name: "store", // Name for localStorage
			storage: createJSONStorage(() => localStorage), // Uses localStorage for persistence
		}
	)
);

export default useStore;
