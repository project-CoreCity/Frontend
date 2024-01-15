import DashboardButton from "@/components/buttons/DashboardButton";
import { useSelector } from "react-redux";
import RequestDetail from "./RequestDetail";
import { seeLessIcon, seeMoreIcon } from "@/assets/svgIcons";
import { useState } from "react";

function RequestList() {
  const isAdminUser = useSelector((state) => state.userRole.isAdmin);
  const allRequestsByAddress = useSelector(
    (state) => state.pendingRequests.requests,
  );
  const loading = useSelector(
    (state) => state.pendingRequestsFetchStatus.loading,
  );
  const error = useSelector((state) => state.pendingRequestsFetchStatus.error);

  const [showComponent, setShowComponent] = useState(false);

  const handleSeeMoreClick = (address) => {
    setShowComponent((prev) => ({ ...prev, [address]: !prev[address] }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isAdminUser === true ? (
        <>
          <div className="flex my-6 justify-center text-2xl">
            {allRequestsByAddress.data.length !== 1
              ? "Approval Requests"
              : "Approval Request"}
          </div>
          {allRequestsByAddress.data.length === 0 ? (
            <p>
              {
                "It's crickets over here! Not a single access request has buzzed into the server I'm managing."
              }
            </p>
          ) : (
            <div>
              {allRequestsByAddress.data.map((requestsByAddress) => (
                <div
                  className="mt-2 py-3 bg-white/10 text-sm hover:bg-white/25"
                  key={requestsByAddress.address}
                >
                  <DashboardButton
                    address={requestsByAddress.address}
                    text={requestsByAddress.address}
                    css="flex justify-center mb-2 text-base font-bold cursor-pointer hover:text-white/75 hover:underline"
                  />
                  {requestsByAddress.requests.length === 0 ? (
                    <p className="text-center">No approval requests.</p>
                  ) : (
                    <>
                      <div className="text-center">
                        <span className="font-bold text-[#FF6915]">
                          {requestsByAddress.requests.length !== 1
                            ? `${requestsByAddress.requests.length} Approval requests`
                            : `Approval request`}
                        </span>
                        {` have arrived on your server dashboard.`}
                      </div>
                      <div
                        className="flex justify-center my-2 cursor-pointer"
                        onClick={() => {
                          handleSeeMoreClick(requestsByAddress.address);
                        }}
                      >
                        {showComponent[requestsByAddress.address]
                          ? seeLessIcon
                          : seeMoreIcon}
                      </div>
                      <RequestDetail
                        requestData={requestsByAddress.requests}
                        targetAddress={requestsByAddress.address}
                        showContents={showComponent[requestsByAddress.address]}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="flex justify-center my-2 text-sm">
          {"Looks like you're not on server duty at the moment :)"}
        </p>
      )}
    </div>
  );
}

export default RequestList;
