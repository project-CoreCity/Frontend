import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAccessRequestUserList } from "@/apis/adminUser";
import ApprovalStatusButton from "@/components/buttons/ApprovalStatusButton";

function RequestDetail({ requestData, targetAddress, showContents }) {
  const token = useSelector((state) => state.user.token);

  const [requestResult, setRequestResult] = useState(null);

  const loadRequestUserList = useCallback(async () => {
    const requestUserIds = requestData.map(
      (requestUserData) => requestUserData.userId,
    );

    const result = await getAccessRequestUserList(
      targetAddress,
      requestUserIds,
      token,
    );

    setRequestResult(result);
  }, [requestData]);

  useEffect(() => {
    loadRequestUserList();
  }, [loadRequestUserList]);

  const wrapperStyle = {
    height: showContents ? `${requestResult?.userList.length * 3.5}rem` : "0",
  };

  return (
    <div
      className="flex flex-col justify-center overflow-hidden gap-5"
      style={wrapperStyle}
    >
      {requestResult !== null &&
        requestResult.userList.map((user) => (
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
