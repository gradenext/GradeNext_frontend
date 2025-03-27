import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { logout } from "../services/auth";

const useStore = create(
	persist(
		(set, get) => ({
			token: null,
			session_id: null,
			account_id: null,
			user: null,
			quizQuestion: null,
			selectedSubject: null,
			selectedMode: null,

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

			getGrade: () => {
				return get().user.grade;
			},

			getSelectedSubject: () => {
				return get().selectedSubject;
			},

			getselectedMode: () => {
				return get().selectedMode;
			},

			setQuizQuestion: (quizQuestion) => {
				set({ quizQuestion });
			},

			getQuizQuestion: () => {
				return get().quizQuestion;
			},
		}),
		{
			name: "store", // Name for localStorage
			storage: createJSONStorage(() => localStorage), // Uses localStorage for persistence
		}
	)
);

export default useStore;
