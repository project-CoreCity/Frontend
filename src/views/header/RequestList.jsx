import DashboardButton from "@/components/buttons/DashboardButton";
import { useSelector } from "react-redux";

function RequestList() {
  const isAdminUser = useSelector((state) => state.userRole.isAdmin);
  const requests = useSelector((state) => state.pendingRequests.requests);
  const loading = useSelector(
    (state) => state.pendingRequestsFetchStatus.loading,
  );
  const error = useSelector((state) => state.pendingRequestsFetchStatus.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isAdminUser === true ? (
        <>
          <div className="flex justify-center text-lg">
            {requests.data.length !== 1
              ? "Approval Requests"
              : "Approval Request"}
          </div>
          {requests.data.length === 0 ? (
            <p>
              {
                "It's crickets over here! Not a single access request has buzzed into the server I'm managing."
              }
            </p>
          ) : (
            <div>
              {requests.data.map((item) =>
                item.requests.length === 0 ? (
                  ""
                ) : (
                  <div
                    className="my-2 px-10 py-2 bg-white/10 text-sm text-balance hover:bg-white/25"
                    key={item.address}
                  >
                    <span className="font-bold text-[#FF6915]">{`${item.requests.length} approval request(s)`}</span>

                    {` have arrived on your server address `}

                    <DashboardButton
                      address={item.address}
                      text={item.address}
                      css="font-bold cursor-pointer hover:text-white/75 hover:underline"
                    />
                  </div>
                ),
              )}
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
