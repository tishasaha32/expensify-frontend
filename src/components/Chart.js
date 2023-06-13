import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import styles from './Chart.module.css'

function Chart({ transactions }) {
  const [transactionChart, setTransactionChart] = useState(null);

  useEffect(() => {
    const aggregatedData = transactions.reduce((result, transaction) => {
      const { category, expense } = transaction.attributes;
  
      // Check if the category already exists in the result object
      if (!result[category]) {
        // If not, initialize the category with the expense value
        result[category] = expense;
      } else {
        // If the category already exists, add the expense to the existing value
        result[category] += expense;
      }
  
      return result;
    }, {});

    const transactionCategories = Object.keys(aggregatedData);
    const transactionExpenses = Object.values(aggregatedData);

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
    <div className={styles.chartContainer}>
      {transactionChart && (
        <Bar className={styles.chart} 
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
