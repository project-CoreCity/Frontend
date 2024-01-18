import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "@/features/user-role/slice";
import { setRequestData } from "@/features/pending-requests/slice";
import {
  setLoading,
  setError,
} from "@/features/pending-requests/fetchStatusSlice";
import { getServerAddressList } from "@/apis/user";
import { getPendingRequests } from "@/apis/adminUser";
import { allowAccessRequest } from "@/apis/adminUser";

function ApprovalStatusButton({
  title,
  css,
  serverAddress,
  userId,
  isApproved,
}) {
  const adminUserId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadRequestList = useCallback(async () => {
    if (!adminUserId || !token) {
      dispatch(setLoading(false));

      return;
    }

    dispatch(setLoading(true));

    const serverList = await getServerAddressList(adminUserId, token);

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

    const requestResults = await getPendingRequests(adminServerIds, token);

    if (requestResults.error) {
      dispatch(setError(requestResults.error));
      dispatch(setLoading(false));

      return;
    }

    dispatch(setRequestData(requestResults));
    dispatch(setError(null));
    dispatch(setLoading(false));
  }, [adminUserId, token, dispatch]);

  const handleAllowRequest = async () => {
    try {
      const response = await allowAccessRequest(
        serverAddress,
        userId,
        isApproved,
        token,
      );

      if (response.status === "Success") {
        loadRequestList();

        return;
      }

      if (response.status === "Error") {
        alert(response.message);
      }
    } catch (error) {
      navigate("/error", { state: { error: error.message } });
    }
  };

  return (
    <button className={css} onClick={handleAllowRequest}>
      {title}
    </button>
  );
}

ApprovalStatusButton.propTypes = {
  title: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  serverAddress: PropTypes.string,
  userId: PropTypes.string,
  isApproved: PropTypes.bool,
};

export default ApprovalStatusButton;
