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

export const profile = async () => {
	try {
		const response = await api.get("auth/profile/");
		return response.data;
	} catch (error) {
		if (error.response?.data) {
			throw error.response.data;
		}
		throw { error: "Network error" };
	}
};

export const startSession = async () => {
	try {
		const response = await api.post("sessions/");
		return response.data.session_id;
	} catch (error) {
		if (error.response?.data) {
			throw error.response.data;
		}
		throw { error: "Network error" };
	}
};

export const endSession = async (session_id) => {
	try {
		const response = await api.post(`sessions/${session_id}/expire/`);
		return response.data;
	} catch (error) {
		if (error.response?.data) {
			throw error.response.data;
		}
		throw { error: "Network error" };
	}
};
