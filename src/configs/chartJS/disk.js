export const diskConfig = () => {
  return {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Data Read",
          fill: true,
          data: [],
          backgroundColor: "rgb(33, 255, 82)",
          borderWidth: 1,
          pointRadius: 0,
          tension: 0.2,
          barThickness: 25,
        },
        {
          label: "Data Written",
          fill: true,
          data: [],
          backgroundColor: "rgb(255, 184, 0)",
          borderWidth: 1,
          pointRadius: 0,
          tension: 0.2,
          barThickness: 25,
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

              if (label === "Data Written") {
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
          stacked: true,
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
