import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allowApprovalRequest, denyApprovalRequest } from "@/apis/adminUser";
import { loadApprovalRequestServerList } from "@/utils/approval-request/apiRequest";

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

  const refreshApprovalRequestServerList = useCallback(async () => {
    loadApprovalRequestServerList(adminUserId, token, dispatch);
  }, [adminUserId, token, dispatch]);

  const handleAllowRequest = async () => {
    try {
      const response =
        isApproved === true
          ? await allowApprovalRequest(serverAddress, userId, isApproved, token)
          : await denyApprovalRequest(serverAddress, userId, token);

      if (response.status === "Success") {
        refreshApprovalRequestServerList();

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
