import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadApprovalRequestServerList } from "@/utils/approval-request/apiRequest";

const useLoadApprovalRequestServerList = () => {
  const adminUserId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const apiRequest = useCallback(() => {
    loadApprovalRequestServerList(adminUserId, token, dispatch);
  }, [adminUserId, token, dispatch]);

  useEffect(() => {
    apiRequest();
  }, [apiRequest]);
};

export default useLoadApprovalRequestServerList;
