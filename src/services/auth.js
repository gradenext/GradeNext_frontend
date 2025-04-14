import api from "./api";

export const signIn = async (email, password) => {
	try {
		const response = await api.post("auth/login/", {
			email,
			password,
		});
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const register = async (userData) => {
	try {
		const response = await api.post("auth/register/", userData);
		return response.data;
	} catch (error) {
		if (error.response?.data) {
			throw error.response.data;
		}
		throw { error: "Network error" };
	}
};
