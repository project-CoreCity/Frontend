import {
  setLoading,
  setError,
} from "@/features/approval-request/fetchStatusSlice";
import { setApprovalRequestServerList } from "@/features/approval-request/slice";
import { getServerAddressList } from "@/apis/user";
import { getApprovalRequestServerList } from "@/apis/adminUser";
import { setUserRole } from "@/features/user-role/slice";

export const loadApprovalRequestServerList = async (
  adminUserId,
  token,
  dispatch,
) => {
  if (!adminUserId || !token) {
    dispatch(setLoading(false));

    return;
  }

  dispatch(setLoading(true));

  const responseServerList = await getServerAddressList(adminUserId, token);

  if (responseServerList.error) {
    dispatch(setError(responseServerList.error));
    dispatch(setLoading(false));

    return;
  }

  const adminServerIds = responseServerList
    .filter((server) => server.isAdmin)
    .map((server) => server.id);

  if (adminServerIds.length === 0) {
    dispatch(setUserRole(false));
    dispatch(setLoading(false));

    return;
  }

  const responseApprovalRequestServerList = await getApprovalRequestServerList(
    adminServerIds,
    token,
  );

  if (responseApprovalRequestServerList.error) {
    dispatch(setError(responseApprovalRequestServerList.error));
    dispatch(setLoading(false));

    return;
  }

  dispatch(setApprovalRequestServerList(responseApprovalRequestServerList));
  dispatch(setError(null));
  dispatch(setLoading(false));
};
