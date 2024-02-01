import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getApprovalRequestUserList } from "@/apis/adminUser";
import ApprovalStatusButton from "@/components/buttons/ApprovalStatusButton";

function RequestDetail({ requestData, targetAddressId, showContents }) {
  const token = useSelector((state) => state.user.token);
  const [approvalRequestUserList, setApprovalRequestUserList] = useState(null);
  const loadApprovalRequestUserList = useCallback(async () => {
    const requestUserIds = requestData.map(
      (requestUserData) => requestUserData.userId,
    );

    const responseApprovalRequestUserList = await getApprovalRequestUserList(
      targetAddressId,
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
        approvalRequestUserList.data.map((requestUser) => (
          <div
            key={requestUser.name}
            className="flex items-center justify-between gap-5 px-5"
          >
            <div>
              <span className="font-bold">{requestUser.name}</span>
              {` has sent you a request.`}
            </div>

            <div className="flex justify-between gap-4">
              <ApprovalStatusButton
                title="Allow"
                css="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md"
                addressId={requestUser.addressId}
                userId={requestUser.id}
                isApproved={true}
              />

              <ApprovalStatusButton
                title="Deny"
                css="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md"
                addressId={requestUser.addressId}
                userId={requestUser.id}
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
  targetAddressId: PropTypes.string.isRequired,
  showContents: PropTypes.bool,
};

export default RequestDetail;
