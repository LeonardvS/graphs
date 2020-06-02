import React, { useState, useEffect } from 'react';
import './chart.css';

import { Line } from 'react-chartjs-2';

export default function Chart() {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: "level of thiccness",
          data: [32, 45, 12, 76, 69],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 2
        },
        {
          label: "level of slickness",
          data: [16, 23, 22, 76, 10],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 2
        }
      ]
    });
  }

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="">
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
}