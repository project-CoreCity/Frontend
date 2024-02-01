import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getServerAddressList } from "@/apis/user";
import ServerAddressForm from "./ServerAddressForm";
import DashboardButton from "@/components/buttons/DashboardButton";

function ServerAddressList() {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverAddresses, setServerAddresses] = useState([]);

  const loadServerAddresses = useCallback(async () => {
    if (!userId) {
      setLoading(false);

      return;
    }

    setLoading(true);

    const result = await getServerAddressList(userId, token);

    if (result.error) {
      setError(result.error);
      setLoading(false);

      return;
    }

    setServerAddresses(result);
    setError(null);
    setLoading(false);
  }, [userId, token]);

  useEffect(() => {
    loadServerAddresses();
  }, [loadServerAddresses]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen-minus-header">
      <h2 className="font-figtree items-center h-[100px] text-[80px] text-white">
        Core City
      </h2>

      <p className="mt-5 text-xl text-white">
        {`Plant your server address for monitoring,
        and watch a splendid village grow!`}
      </p>

      <div className="flex flex-col items-center mx-auto relative">
        <ServerAddressForm onAddAddress={loadServerAddresses} />
        {!loading && serverAddresses.length === 0 ? (
          ""
        ) : (
          <>
            <div className="pt-7 h-[200px] border-t-2 border-[#d9d9d9] overflow-scroll">
              {serverAddresses.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center flex-row mb-3 ${
                    !item.isApproved ? "text-[#999]" : "text-white"
                  }`}
                >
                  <span className="mr-8 w-[200px] text-[16px]">
                    {item.address}
                  </span>

                  {item.isApproved ? (
                    <DashboardButton
                      address={item.address}
                      text="Dashboard"
                      css="flex items-center py-1 px-2 bg-[#34c759] hover:bg-[#6ed989] text-[13px] text-white font-bold rounded-md cursor-pointer"
                    />
                  ) : (
                    <span className="py-1 px-2 border-[#e8eaee] bg-[#f1f3f6] text-[13px] text-[#999999] font-bold rounded-md cursor-not-allowed">
                      Requested
                    </span>
                  )}
                </div>
              ))}
              <div className="h-[25px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent from-70% to-[#293137] pointer-events-none"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServerAddressList;
