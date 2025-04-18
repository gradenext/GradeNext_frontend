import axios from "axios";

const api = axios.create({
	baseURL: "https://gradenext-backend.onrender.com/api/", // Your Django backend URL
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Token ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response &&
			(error.response.status === 401 || error.response.status === 403)
		) {
			sessionStorage.removeItem("token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;
