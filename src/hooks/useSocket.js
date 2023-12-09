import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (serverAddress, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serverAddress && token) {
      const socket = io(import.meta.env.VITE_BACKEND_URL, {
        query: { address: serverAddress, token },
      });

      socket.on("monitoringData", (data) => {
        if (data.error) {
          setError(
            `Oops😳 An error occurred...

            Data is not being retrieved from the monitoring server.
            Don't worry, we're trying to reconnect!

            Once the server is restored, the dashboard will automatically update😉`,
          );

          return;
        }

        setData(data);
        setError(null);
      });

      socket.on("connect_error", () => {
        setError(
          `Oops😳 An error occurred...

          It seems like we've lost our connection to the server.
          Don't worry, we're trying to reconnect!

          Once the server is restored, the dashboard will automatically update😉`,
        );
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [serverAddress, token]);

  return { data, error };
};

export default useSocket;
