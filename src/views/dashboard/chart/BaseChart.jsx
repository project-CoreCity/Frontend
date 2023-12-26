import { useEffect, useRef } from "react";
import { formatLocalDateTime } from "@/utils/timeFormat";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

function BaseChart({ data, chartConfig, isLoading }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      const ctx = chartRef.current.getContext("2d");
      const config = chartConfig();

      chartInstance.current = new Chart(ctx, config);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const chart = chartInstance.current;
      const now = new Date();
      const label = formatLocalDateTime(now);

      chart.data.labels.push(`Time: ${label}`);

      if (data.length === 1) {
        const value = parseFloat(data);

        chart.data.datasets[0].data.push(value);
      }

      if (data.length === 2) {
        const value1 = parseFloat(data[0]);
        const value2 = -parseFloat(data[1]);

        chart.data.datasets[0].data.push(value1);
        chart.data.datasets[1].data.push(value2);
      }

      if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets.forEach((dataset) => {
          dataset.data.shift();
        });
      }

      chart.update();
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <canvas ref={chartRef}></canvas>;
}

BaseChart.propTypes = {
  data: PropTypes.array,
  chartConfig: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default BaseChart;
