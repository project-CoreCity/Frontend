import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAccessRequestUserList } from "@/apis/adminUser";

function RequestDetail({ requestData, targetAddress, showContents }) {
  const token = useSelector((state) => state.user.token);
  const [requestResult, serRequestResult] = useState(null);

  const loadRequestUserList = useCallback(async () => {
    const requestUserIds = requestData.map(
      (requestUserData) => requestUserData.userId,
    );

    const result = await getAccessRequestUserList(
      targetAddress,
      requestUserIds,
      token,
    );

    serRequestResult(result);
  }, [requestData]);

  useEffect(() => {
    loadRequestUserList();
  }, [loadRequestUserList]);

  const wrapperClass = `flex justify-center overflow-hidden ${
    showContents ? `h-${requestResult.userList.length * 12}` : "h-0"
  } transition-height duration-1000 ease-in-out `;

  return (
    <div className={wrapperClass}>
      <div className="grid grid-cols-6 justify-between px-5 mb-5 w-full items-center">
        <div className="col-span-4">
          {requestResult !== null &&
            requestResult.userList.map((user) => (
              <span key={user.name} className="font-bold">
                {user.name}
              </span>
            ))}
          {` has sent you a request.`}
        </div>

        <div className="flex justify-between items-center col-span-2">
          <button className="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md">
            Allow
          </button>

          <button className="px-2 w-14 h-7 font-bold bg-[#FF6915] rounded-md">
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

RequestDetail.propTypes = {
  requestData: PropTypes.array.isRequierd,
  targetAddress: PropTypes.string.isRequired,
  showContents: PropTypes.bool.isRequired,
};

export default RequestDetail;
