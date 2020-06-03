import React, { useState, useEffect } from 'react';
import './chart.css';

import { getBTC, getEth, getBCH } from '../../services/apiClient';
import { Line, Bar } from 'react-chartjs-2';

export default function Chart() {
  const [chartData, setChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  const getData = async () => {
    const btcResponse = await getBTC();
    const ethResponse = await getEth();
    const bchResponse = await getBCH();

    const btcDate = [];
    const btcPrice = [];
    const ethDate = [];
    const ethPrice = [];
    const bchDate = [];
    const bchPrice = [];

    for (let key in btcResponse['Time Series (Digital Currency Monthly)']) {
      btcDate.push(key);
      btcPrice.push(btcResponse['Time Series (Digital Currency Monthly)'][key]['4a. close (USD)']);
    }

    for (let key in ethResponse['Time Series (Digital Currency Monthly)']) {
      ethDate.push(key);
      ethPrice.push(ethResponse['Time Series (Digital Currency Monthly)'][key]['4a. close (USD)']);
    }

    for (let key in bchResponse['Time Series (Digital Currency Monthly)']) {
      bchDate.push(key);
      bchPrice.push(bchResponse['Time Series (Digital Currency Monthly)'][key]['4a. close (USD)']);
    }

    setChartData({
      labels: btcDate,
      datasets: [
        {
          label: "BTC price/monthly",
          data: btcPrice,
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 1,
          borderColor: 'orange'
        },
        {
          label: "Eth price/monthly",
          data: ethPrice,
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderWidth: 1,
          borderColor: '#3c3c3d'
        }
      ]
    });

    setBarChartData({
      labels: bchDate,
      datasets: [
        {
          label: "BCH price/monthly",
          data: bchPrice,
          backgroundColor: 'green',
          borderWidth: 1,
          borderColor: 'green'
        },
        {
          label: "Eth price/monthly",
          data: ethPrice,
          backgroundColor: '#3c3c3d',
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
      <div className="line">
        <Line
          data={chartData}
          options={{
            responsive: true
          }}
        />
      </div>
      <div className="bar">
        <Bar
          data={barChartData}
          options={{
            responsive: true
          }}
        />
      </div>
    </div>
  );
}