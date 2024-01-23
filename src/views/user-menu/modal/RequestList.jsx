import DashboardButton from "@/components/buttons/DashboardButton";
import { useSelector } from "react-redux";
import RequestDetail from "./RequestDetail";
import { seeLessIcon, seeMoreIcon } from "@/assets/svgIcons";
import { useState } from "react";

function RequestList() {
  const isAdminUser = useSelector((state) => state.userRole.isAdmin);
  const approvalRequestServerList = useSelector(
    (state) => state.approvalRequestServerList.serverList,
  );
  const loading = useSelector(
    (state) => state.approvalRequestFetchStatus.loading,
  );
  const error = useSelector((state) => state.approvalRequestFetchStatus.error);

  const [showComponent, setShowComponent] = useState(false);

  const handleSeeMoreClick = (address) => {
    setShowComponent((prev) => ({ ...prev, [address]: !prev[address] }));
  };

  if (loading) return <div className="flex justify-center">Loading...</div>;
  if (error) return <div className="flex justify-center">Error: {error}</div>;

  return (
    <div className="relative">
      {isAdminUser === true ? (
        <>
          <div className="flex my-6 justify-center text-2xl">
            {approvalRequestServerList.data.length !== 1
              ? "Approval Requests"
              : "Approval Request"}
          </div>

          <div
            className={
              approvalRequestServerList.data.length >= 6 &&
              `h-[500px] overflow-scroll`
            }
          >
            {approvalRequestServerList.data.map((server) => (
              <div
                className="flex flex-col mt-2 py-3 bg-white/10 text-sm hover:bg-white/25"
                key={server.address}
              >
                <DashboardButton
                  address={server.address}
                  text={server.address}
                  css="flex items-center justify-center mb-2 text-base font-bold hover:text-white/75 hover:underline"
                />
                {server.requestList.length === 0 ? (
                  <p className="text-center">{`No approval requests here :)`}</p>
                ) : (
                  <>
                    <div className="text-center">
                      <span className="font-bold text-[#FF6915]">
                        {server.requestList.length !== 1
                          ? `${server.requestList.length} Approval requests`
                          : `Approval request`}
                      </span>
                      {` have arrived on your server dashboard.`}
                    </div>
                    <button
                      className="flex justify-center my-2"
                      onClick={() => {
                        handleSeeMoreClick(server.address);
                      }}
                    >
                      {showComponent[server.address]
                        ? seeLessIcon
                        : seeMoreIcon}
                    </button>
                    {showComponent[server.address] && (
                      <RequestDetail
                        requestData={server.requestList}
                        targetAddress={server.address}
                        showContents={showComponent[server.address]}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
            {approvalRequestServerList.data.length >= 6 && (
              <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent from-70% to-[#293137] pointer-events-none"></div>
            )}
          </div>
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
