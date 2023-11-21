import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_LOCALHOST_BACKEND;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const authenticateUser = async (token) => {
  try {
    const response = await apiClient.post(`/api/v1/users/auth-token`, {
      token,
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "Authentication failed" };
  }
};

export const getUserInformation = async (uid, token) => {
  try {
    const response = await apiClient.get(`/api/v1/users/${uid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "An error occurred" };
  }
};

export const getServerAddressList = async (userId, token) => {
  try {
    const response = await apiClient.get(
      `/api/v1/users/${userId}/server-addresses`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "An error occurred" };
  }
};

export const addServerAddress = async (userId, token, serverAddress) => {
  try {
    const response = await apiClient.post(
      `/api/v1/users/${userId}/server-addresses`,
      { serverAddress },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || "An error occurred" };
  }
};
