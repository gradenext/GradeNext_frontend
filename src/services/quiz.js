import api from "./api";

export const generateQuestion = async (session_id, grade, subject) => {
	try {
		const response = await api.post("/questions/", {
			grade,
			subject,
			session_id,
		});

		return response;
	} catch (error) {
		return error;
	}
};
