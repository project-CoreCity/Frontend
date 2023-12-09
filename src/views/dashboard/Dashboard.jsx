import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../hooks/useSocket";
import { setMonitorData } from "../../features/monitor/monitorSlice";
import { memoryConfig } from "./chartConfigs/memory";
import { networkConfig } from "./chartConfigs/network";
import { diskConfig } from "./chartConfigs/disk";
import Panel from "./Panel";
import SystemOverview from "./SystemOverview";
import BaseChart from "./BaseChart";

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const serverAddress = location.state?.address;
  const token = useSelector((state) => state.user.token);
  const { data, error } = useSocket(serverAddress, token);
  const monitorData = useSelector((state) => state.monitor.data);

  useEffect(() => {
    if (data) {
      dispatch(setMonitorData(data));
    }
  }, [dispatch, data]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-center text-2xl text-white whitespace-pre-line">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Panel>
        <SystemOverview
          title={"CPU"}
          detail1={
            monitorData
              ? `User: ${monitorData.cpuMetrics.cpuUsageUser}`
              : "Loading..."
          }
          detail2={
            monitorData
              ? `System: ${monitorData.cpuMetrics.cpuUsageSystem}`
              : "Loading..."
          }
          additionalCss={"col-span-4"}
        >
          <div
            className={`${monitorData ? "py-4 text-5xl font-bold" : "py-4"}`}
          >
            {monitorData ? monitorData.cpuMetrics.mainDisplay : "Loading..."}
          </div>
        </SystemOverview>

        <SystemOverview
          title={"Memory"}
          detail1={
            monitorData
              ? `Free: ${monitorData.memoryMetrics.memoryFree}`
              : "Loading..."
          }
          detail2={
            monitorData
              ? `Swap Used: ${monitorData.memoryMetrics.swapUsed}`
              : "Loading..."
          }
          additionalCss={"col-span-5"}
        >
          <BaseChart
            data={monitorData && monitorData.memoryMetrics.mainDisplay}
            chartConfig={memoryConfig}
            isLoading={!monitorData}
          />
        </SystemOverview>

        <SystemOverview
          title={"Network"}
          detail1={
            monitorData
              ? `Receive/sec: ${monitorData.networkMetrics.mainDisplay[0]}`
              : "Loading..."
          }
          detail2={
            monitorData
              ? `Sent/sec: ${monitorData.networkMetrics.mainDisplay[1]}`
              : "Loading..."
          }
          additionalCss={"col-span-9"}
        >
          <BaseChart
            data={monitorData && monitorData.networkMetrics.mainDisplay}
            chartConfig={networkConfig}
            isLoading={!monitorData}
          />
        </SystemOverview>

        <SystemOverview
          title={"Disk"}
          detail1={
            monitorData
              ? `Read/sec: ${monitorData.diskMetrics.mainDisplay[0]}`
              : "Loading..."
          }
          detail2={
            monitorData
              ? `Written/sec: ${monitorData.diskMetrics.mainDisplay[1]}`
              : "Loading..."
          }
          additionalCss={"col-span-9"}
        >
          <BaseChart
            data={monitorData && monitorData.diskMetrics.mainDisplay}
            chartConfig={diskConfig}
            isLoading={!monitorData}
          />
        </SystemOverview>
      </Panel>
    </div>
  );
}

export default Dashboard;
