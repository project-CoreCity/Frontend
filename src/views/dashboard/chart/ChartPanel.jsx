import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { memoryConfig } from "@/configs/chartJS/memory";
import { networkConfig } from "@/configs/chartJS/network";
import { diskConfig } from "@/configs/chartJS/disk";
import SystemOverview from "./SystemOverview";
import BaseChart from "./BaseChart";

function ChartPanel({ initialData }) {
  const [data, setData] = useState(initialData);
  const location = useLocation();
  const serverAddress = location.state?.address;

  useEffect(() => {
    setData(null);
  }, [location]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <section className="flex flex-col items-center justify-center mini:mb-5">
      <h2 className="mini:my-5  mb-10 text-xl text-white">
        {serverAddress === "guestMode" ? "Guest Mode" : serverAddress}
      </h2>

      <div className="grid grid-cols-9 gap-4 w-5/6 text-center text-white mini:flex mini:flex-col">
        <SystemOverview
          title={"CPU"}
          detail1={
            data ? `User: ${data.cpuMetrics.cpuUsageUser}` : "Loading..."
          }
          detail2={
            data ? `System: ${data.cpuMetrics.cpuUsageSystem}` : "Loading..."
          }
          additionalCss={"col-span-4"}
        >
          <div className={`${data ? "py-4 text-5xl font-bold" : "py-4"}`}>
            {data ? data.cpuMetrics.mainDisplay : "Loading..."}
          </div>
        </SystemOverview>

        <SystemOverview
          title={"Memory"}
          detail1={
            data ? `Free: ${data.memoryMetrics.memoryFree}` : "Loading..."
          }
          detail2={
            data ? `Swap Used: ${data.memoryMetrics.swapUsed}` : "Loading..."
          }
          additionalCss={"col-span-5"}
        >
          <BaseChart
            data={data && data.memoryMetrics.mainDisplay}
            chartConfig={memoryConfig}
            isLoading={!data}
          />
        </SystemOverview>

        <SystemOverview
          title={"Network"}
          detail1={
            data
              ? `Receive/sec: ${data.networkMetrics.mainDisplay[0]}`
              : "Loading..."
          }
          detail2={
            data
              ? `Sent/sec: ${data.networkMetrics.mainDisplay[1]}`
              : "Loading..."
          }
          additionalCss={"col-span-9"}
        >
          <BaseChart
            data={data && data.networkMetrics.mainDisplay}
            chartConfig={networkConfig}
            isLoading={!data}
          />
        </SystemOverview>

        <SystemOverview
          title={"Disk"}
          detail1={
            data ? `Read/sec: ${data.diskMetrics.mainDisplay[0]}` : "Loading..."
          }
          detail2={
            data
              ? `Written/sec: ${data.diskMetrics.mainDisplay[1]}`
              : "Loading..."
          }
          additionalCss={"col-span-9"}
        >
          <BaseChart
            data={data && data.diskMetrics.mainDisplay}
            chartConfig={diskConfig}
            isLoading={!data}
          />
        </SystemOverview>
      </div>
    </section>
  );
}

ChartPanel.propTypes = {
  initialData: PropTypes.object,
};

export default ChartPanel;
