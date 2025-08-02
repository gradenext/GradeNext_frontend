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

export const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post("auth/verify-otp/", {
      email,
      otp,
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

export const leaderBoard = async () => {
  try {
    const response = await api.get("leaderboard/");
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { error: "Network error" };
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await api.post("auth/forgot-password/", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const resetPassword = async (email, otp, new_password) => {
  try {
    const response = await api.post("auth/reset-password/", {
      email,
      otp,
      new_password,
    });
    return response.data;
  } catch (error) {
    throw error.response;
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
