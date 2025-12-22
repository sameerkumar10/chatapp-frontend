import React from "react";
import { Line, Doughnut, Chart } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  plugins,
} from "chart.js";
import { orange, orangeLight, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
const labels = getLast7Days();
const lineChartOptions = {
  Responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scale: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  Responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    cutout: 120,
  },
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        hoverBackgroundColor: [purpleLight, orangeLight],
        backgroundColor: [purple, orange],
        borderColor: [purple, orange],
        offset:40,
      },
    ],
  };
  return <Doughnut style={{
    zIndex: 10,
  }} data={data} options={doughnutChartOptions}/>;
};

export { LineChart, DoughnutChart };
