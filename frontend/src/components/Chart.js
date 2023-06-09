


import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: true,
      },
      ticks: {
        color: "#fff",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#fff",
      },
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//


const Chart = ({ studyData, isLoading }) => {
    
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!studyData || studyData.length <= 0) {
    return <p>No data currently.</p>;
  }
  const labels = [
    ...studyData.map((study) => {
      const date = new Date(study.date);
      const month = date.getMonth() + 1;
      const day = date.getDay() +1;
      return `${month}/${day}`;
    }),
  ].reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [5, 6, 8, 9, 5, 10, 7],
        borderColor: "#fff",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;


