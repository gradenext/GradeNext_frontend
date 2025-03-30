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

export const generateRevision = async (session_id, grade, subject) => {
	try {
		const response = await api.post("/revision-questions/", {
			grade,
			subject,
			session_id,
		});

		return response;
	} catch (error) {
		return error;
	}
};

export const submitAnswer = async (question_id, user_answer) => {
	try {
		const response = await api.post("/submit-answer/", {
			question_id,
			user_answer,
		});

		return response;
	} catch (error) {
		return error;
	}
};
