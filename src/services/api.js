import axios from "axios";
import useStore from "../store/store";

const api = axios.create({
  baseURL: "https://api.gradenext.com/api/",
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
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token");
      useStore.getState().logout();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
