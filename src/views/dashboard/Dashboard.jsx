import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMonitorData } from "@/features/monitor/slice";
import useSocket from "@/hooks/useSocket";
import ChartPanel from "./chart/ChartPanel";
import VisualPanel from "./visual/VisualPanel";

function Dashboard() {
  const location = useLocation();
  const serverAddress = location.state?.address;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const monitorData = useSelector((state) => state.monitor.data);
  const { data, error } = useSocket(serverAddress, token);

  useEffect(() => {
    if (data) {
      dispatch(setMonitorData(data));
    }

    if (error) {
      dispatch(setMonitorData(null));
    }

    return () => {
      dispatch(setMonitorData(null));
    };
  }, [data, error, dispatch]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-center text-2xl text-white whitespace-pre-line">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 h-screen-minus-header">
      <ChartPanel initialData={monitorData} />
      <VisualPanel data={monitorData} />
    </div>
  );
}

export default Dashboard;
