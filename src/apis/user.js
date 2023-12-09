import { callApi } from "../utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  authenticateUser: `${API_BASE_URL}/api/v1/users/auth-token`,
  getUserInformation: (uid) => `${API_BASE_URL}/api/v1/users/${uid}`,
  getServerAddressList: (userId) =>
    `${API_BASE_URL}/api/v1/users/${userId}/server-addresses`,
  addServerAddress: (userId) =>
    `${API_BASE_URL}/api/v1/users/${userId}/server-addresses`,
};

export const authenticateUser = async (token) => {
  return await callApi(API_PATHS.authenticateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export const getUserInformation = async (uid, token) => {
  return await callApi(API_PATHS.getUserInformation(uid), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getServerAddressList = async (userId, token) => {
  return await callApi(API_PATHS.getServerAddressList(userId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addServerAddress = async (userId, token, serverAddress) => {
  return await callApi(API_PATHS.addServerAddress(userId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ serverAddress }),
  });
};
