import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getServerAddressList } from "@/apis/user";
import { goToDashboard } from "@/utils/navigation";
import ServerAddressForm from "./ServerAddressForm";

function ServerAddressList() {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

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
    <div>
      <h1>Server List</h1>
      {!loading && serverAddresses.length === 0 ? (
        <div>No servers available. Add a new server address!</div>
      ) : (
        serverAddresses.map((item) => (
          <div key={item.id}>
            {item.address}
            {item.isApproved ? (
              <button onClick={() => goToDashboard(navigate, item.address)}>
                Go to Dashboard
              </button>
            ) : (
              <span>Approval Pending...</span>
            )}
          </div>
        ))
      )}
      <ServerAddressForm onAddAddress={loadServerAddresses} />
    </div>
  );
}

export default ServerAddressList;
