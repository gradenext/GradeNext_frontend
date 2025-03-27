import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('auth/login/', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
    try {
      const response = await api.post('auth/register/', userData);
      return response.data;
    } catch (error) {
      // Handle Django REST framework validation errors
      if (error.response?.data) {
        throw error.response.data;
      }
      throw { error: 'Network error' };
    }
  };

export const logout = async (token) => {
  try {
    const response = await api.post('auth/logout/', {}, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};