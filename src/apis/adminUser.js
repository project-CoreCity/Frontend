import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getApprovalRequestServerList: (addressIds) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/requests?` +
    addressIds.map((id) => `id=${id}`).join(`&`),
  getApprovalRequestUserList: (serverAddress, userIds) =>
    `${API_BASE_URL}/api/v1/admin/users?address=${encodeURIComponent(
      serverAddress,
    )}&` + userIds.map((id) => `userId=${id}`).join(`&`),
  approvalRequest: (serverAddress, userId) =>
    `${API_BASE_URL}/api/v1/admin/users/${userId}?address=${encodeURIComponent(
      serverAddress,
    )}`,
};

export const getApprovalRequestServerList = async (addressIds, token) => {
  return await callApi(API_PATHS.getApprovalRequestServerList(addressIds), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getApprovalRequestUserList = async (
  serverAddress,
  userIds,
  token,
) => {
  return await callApi(
    API_PATHS.getApprovalRequestUserList(serverAddress, userIds),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const allowApprovalRequest = async (
  serverAddress,
  userId,
  isApproved,
  token,
) => {
  return await callApi(API_PATHS.approvalRequest(serverAddress, userId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isApproved }),
  });
};

export const denyApprovalRequest = async (serverAddress, userId, token) => {
  return await callApi(API_PATHS.approvalRequest(serverAddress, userId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
