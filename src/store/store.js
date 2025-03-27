import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
	persist(
		(set) => ({
			token: null,
			session_id: null,
			account_id: null,
			user: null,

			// Login function
			login: (token, session_id, account_id, user) => {
				set({ token, session_id, account_id, user });
			},

			// Logout function
			logout: () => {
				set({ token: null, session_id: null, account_id: null });
				localStorage.removeItem("token");
				localStorage.removeItem("session_id");
				localStorage.removeItem("account_id");
				window.location.href = "/login";
			},

			selectedSubject: null,

			setSelectedSubject: (subjectId) => {
				set({ selectedSubject: subjectId });
			},

			selectedMode: null,

			setSelectedMode: (actionId) => {
				set({ selectedMode: actionId });
			},
		}),
		{
			name: "store", // Name for localStorage
			storage: createJSONStorage(() => localStorage), // Uses localStorage for persistence
		}
	)
);

export default useStore;
