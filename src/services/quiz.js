import api from "./api";

export const generatePracticeQuestion = async (
	session_id,
	grade,
	subject,
	topic
) => {
	try {
		const response = await api.post("/questions/", {
			grade,
			subject,
			session_id,
			topic,
		});

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const generateRevisionQuestion = async (
	session_id,
	grade,
	subject,
	topic
) => {
	try {
		const response = await api.post("/revision-questions/", {
			grade,
			subject,
			session_id,
			topic,
		});

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const generateTreasureQuestion = async (
	session_id,
	grade,
	subject,
	topic
) => {
	try {
		const response = await api.post("/topic-questions/", {
			grade,
			subject,
			session_id,
			topic,
		});

		return response;
	} catch (error) {
		console.log(error);
		throw error;
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
		console.log(error);
		throw error;
	}
};
export const getTopicIntroduction = async (selectedSubject) => {
	try {
		const response = await api.post("/topic-introduction/", {
			subject: selectedSubject,
		});

		return response?.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getSubjectTopicList = async (subject) => {
	try {
		const response = await api.get(`/subject-topics/${subject}/`);
		return response?.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
