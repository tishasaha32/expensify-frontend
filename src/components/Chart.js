import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";

function Chart({ transactions }) {
  const [transactionChart, setTransactionChart] = useState(null);

  useEffect(() => {
    const transactionCategories = transactions.map((transaction) => transaction.category);
    const transactionExpenses = transactions.map((transaction) => transaction.expense);

    const chartData = {
      labels: transactionCategories,
      datasets: [
        {
          label: 'Category Wise Expense',
          data: transactionExpenses,
          backgroundColor: [
            '#003f5c',
            '#2f4b7c',
            '#665191',
            '#a05195',
            '#d45087',
            '#f95d6a',
            '#ff7c43',
            '#ffa600',
          ],
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    };

    setTransactionChart(chartData);
  }, [transactions]);

  return (
    <div style={{width:'100vw', height: '60vh', padding: '20px'}}>
      {transactionChart && (
        <Bar
          data={transactionChart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {ticks: {font: {size: 14,},},},
              y: {ticks: {font: {size: 14,},},},
            },
            plugins: { legend: { labels: { font: { size: 14,},},},},
          }}
        />
      )}
    </div>
  );
}

export default Chart;