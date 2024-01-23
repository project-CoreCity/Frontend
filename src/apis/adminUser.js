import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getApprovalRequestServerList: (addressIds) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/requests?` +
    addressIds.map((id) => `id=${id}`).join(`&`),
  getApprovalRequestUserList: (addressId, userIds) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/${addressId}/users/requests?` +
    userIds.map((id) => `userId=${id}`).join(`&`),
  approvalRequest: (addressId, userId) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/${addressId}/requests/${userId}`,
};

export const getApprovalRequestServerList = async (addressIds, token) => {
  return await callApi(API_PATHS.getApprovalRequestServerList(addressIds), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getApprovalRequestUserList = async (addressId, userIds, token) => {
  return await callApi(
    API_PATHS.getApprovalRequestUserList(addressId, userIds),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const allowApprovalRequest = async (
  addressId,
  userId,
  isApproved,
  token,
) => {
  return await callApi(API_PATHS.approvalRequest(addressId, userId), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isApproved }),
  });
};

export const denyApprovalRequest = async (addressId, userId, token) => {
  return await callApi(API_PATHS.approvalRequest(addressId, userId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
