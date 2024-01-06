import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getPendingRequests: (addressIds) =>
    `${API_BASE_URL}/api/v1/admin/server-addresses/requests?` +
    addressIds.map((id) => `id=${id}`).join(`&`),
};

export const getPendingRequests = async (addressIds, token) => {
  return await callApi(API_PATHS.getPendingRequests(addressIds), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
