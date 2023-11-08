import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_LOCALHOST_BACKEND;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const authenticateUser = async (token) => {
  const response = await apiClient.post(`/api/v1/users/auth-token`, {
    token,
  });

  return response.data;
};

export const getServerAddressList = async (userId, token) => {
  const response = await apiClient.get(
    `/api/v1/users/${userId}/server-addresses`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
