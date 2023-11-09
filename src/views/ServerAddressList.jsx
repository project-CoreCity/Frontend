import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getServerAddressList } from "../api/api";

function ServerAddressList() {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [serverAddresses, setServerAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadServerAddresses = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await getServerAddressList(userId, token);

        if (isMounted) {
          setServerAddresses(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadServerAddresses();

    return () => {
      isMounted = false;
    };
  }, [userId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Server List</h1>
      {serverAddresses.length === 0 ? (
        <div>No servers available. Add a new server address!</div>
      ) : (
        serverAddresses.map((address) => <div key={address._id}>{address}</div>)
      )}
    </div>
  );
}

export default ServerAddressList;
