import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getPendingRequests: (addressIds) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/requests?` +
    addressIds.map((id) => `id=${id}`).join(`&`),
  getAccessRequestUserList: (serverAddress, userIds) =>
    `${API_BASE_URL}/api/v1/admin/users?address=${encodeURIComponent(
      serverAddress,
    )}&` + userIds.map((id) => `userId=${id}`).join(`&`),
  allowAccessRequest: (serverAddress, userId) =>
    `${API_BASE_URL}/api/v1/admin/users/${userId}?address=${encodeURIComponent(
      serverAddress,
    )}`,
};

export const getPendingRequests = async (addressIds, token) => {
  return await callApi(API_PATHS.getPendingRequests(addressIds), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAccessRequestUserList = async (
  serverAddress,
  userIds,
  token,
) => {
  return await callApi(
    API_PATHS.getAccessRequestUserList(serverAddress, userIds),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const allowAccessRequest = async (
  serverAddress,
  userId,
  isApproved,
  token,
) => {
  return await callApi(API_PATHS.allowAccessRequest(serverAddress, userId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isApproved }),
  });
};
