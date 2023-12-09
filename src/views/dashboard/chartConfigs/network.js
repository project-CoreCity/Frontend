import { getGradient, getGradientReverse } from "@/utils/chartUtils";

export const networkConfig = () => {
  return {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Data Received",
          data: [],
          borderColor: "rgb(3,232,253)",
          borderWidth: 1,
          pointRadius: 0,
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return null;
            }
            return getGradient(
              ctx,
              chartArea,
              "rgba(3,232,253, 0)",
              "rgba(3,232,253, 1)",
            );
          },
          tension: 0.2,
        },
        {
          label: "Data Sent",
          data: [],
          borderColor: "rgb(220,8,32)",
          borderWidth: 1,
          pointRadius: 0,
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return null;
            }
            return getGradientReverse(
              ctx,
              chartArea,
              "rgba(220,8,32, 1)",
              "rgba(220,8,32, 0)",
            );
          },
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 7,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              let value = context.parsed.y;

              if (label === "Data Sent") {
                value = Math.abs(value);
              }

              if (label) {
                label += ": ";
              }
              label += `${value} KB`;
              return label;
            },
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          ticks: {
            stepSize: 5,
          },
        },
      },
    },
  };
};
