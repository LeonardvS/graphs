import React, { useState, useEffect } from 'react';
import './chart.css';

import { getBTC, getEth } from '../../services/apiClient';
import { Line } from 'react-chartjs-2';

export default function Chart() {
  const [chartData, setChartData] = useState({});

  const getData = async () => {
    const btcResponse = await getBTC();
    const ethResponse = await getEth();

    const btcDate = [];
    const btcPrice = [];
    const ethDate = [];
    const ethPrice = [];

    for (let key in btcResponse['Time Series (Digital Currency Monthly)']) {
      btcDate.push(key);
      btcPrice.push(btcResponse['Time Series (Digital Currency Monthly)'][key]['4a. close (USD)']);
    }

    for (let key in ethResponse['Time Series (Digital Currency Monthly)']) {
      ethDate.push(key);
      ethPrice.push(ethResponse['Time Series (Digital Currency Monthly)'][key]['4a. close (USD)']);
    }

    setChartData({
      labels: btcDate,
      datasets: [
        {
          label: "BTC monthly",
          data: btcPrice,
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 1,
          borderColor: 'orange'
        },
        {
          label: "Eth monthly",
          data: ethPrice,
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 1,
          borderColor: '#3c3c3d'
        }
      ]
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrapper">
      <Line
        data={chartData}
        options={{
          responsive: true
        }}
      />
    </div>
  );
}