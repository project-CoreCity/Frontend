import { getGradient } from "@/utils/chartUtils";

export const memoryConfig = () => {
  return {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Memory Used",
          data: [],
          borderColor: false,
          borderWidth: 0,
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
              "rgba(5,250,103, 0)",
              "rgba(5,250,103, 1)",
            );
          },
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 4,
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

              if (label) {
                label += ": ";
              }

              label += `${context.parsed.y} GB`;

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
          beginAtZero: true,
        },
      },
    },
  };
};
