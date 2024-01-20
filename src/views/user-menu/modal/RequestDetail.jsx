import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getApprovalRequestUserList } from "@/apis/adminUser";
import ApprovalStatusButton from "@/components/buttons/ApprovalStatusButton";

function RequestDetail({ requestData, targetAddress, showContents }) {
  const token = useSelector((state) => state.user.token);

  const [approvalRequestUserList, setApprovalRequestUserList] = useState(null);

  const loadApprovalRequestUserList = useCallback(async () => {
    const requestUserIds = requestData.map(
      (requestUserData) => requestUserData.userId,
    );

    const responseApprovalRequestUserList = await getApprovalRequestUserList(
      targetAddress,
      requestUserIds,
      token,
    );

    setApprovalRequestUserList(responseApprovalRequestUserList);
  }, [requestData]);

  useEffect(() => {
    loadApprovalRequestUserList();
  }, [loadApprovalRequestUserList]);

  const wrapperStyle = {
    height: showContents
      ? `${approvalRequestUserList?.data.length * 3.5}rem`
      : "0",
  };

  return (
    <div
      className="flex flex-col justify-center overflow-hidden gap-5"
      style={wrapperStyle}
    >
      {approvalRequestUserList !== null &&
        approvalRequestUserList.data.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between gap-5 px-5"
          >
            <div>
              <span className="font-bold">{user.name}</span>
              {` has sent you a request.`}
            </div>

            <div className="flex justify-between gap-4">
              <ApprovalStatusButton
                title="Allow"
                css="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md"
                serverAddress={targetAddress}
                userId={user.id}
                isApproved={true}
              />

              <ApprovalStatusButton
                title="Deny"
                css="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md"
                serverAddress={targetAddress}
                userId={user.id}
                isApproved={false}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

RequestDetail.propTypes = {
  requestData: PropTypes.array.isRequired,
  targetAddress: PropTypes.string.isRequired,
  showContents: PropTypes.bool,
};

export default RequestDetail;
