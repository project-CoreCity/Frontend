import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "@/features/user-role/slice";
import { setRequestData } from "@/features/pending-requests/slice";
import {
  setLoading,
  setError,
} from "@/features/pending-requests/fetchStatusSlice";
import { getServerAddressList } from "@/apis/user";
import { getPendingRequests } from "@/apis/adminUser";

const useLoadPendingRequests = () => {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const loadRequestList = useCallback(async () => {
    if (!userId || !token) {
      dispatch(setLoading(false));

      return;
    }

    dispatch(setLoading(true));

    const serverList = await getServerAddressList(userId, token);

    if (serverList.error) {
      dispatch(setError(serverList.error));
      dispatch(setLoading(false));

      return;
    }

    const adminServerIds = serverList
      .filter((server) => server.isAdmin)
      .map((server) => server.id);

    if (adminServerIds.length === 0) {
      dispatch(setUserRole(false));
      dispatch(setLoading(false));

      return;
    }

    const requestsResults = await getPendingRequests(adminServerIds, token);

    if (requestsResults.error) {
      dispatch(setError(requestsResults.error));
      dispatch(setLoading(false));

      return;
    }

    dispatch(setRequestData(requestsResults));
    dispatch(setError(null));
    dispatch(setLoading(false));
  }, [userId, token, dispatch]);

  useEffect(() => {
    loadRequestList();
  }, [loadRequestList]);
};

export default useLoadPendingRequests;
