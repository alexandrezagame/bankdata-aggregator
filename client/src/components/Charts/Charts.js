import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const colors = [
  'red',
  'blue',
  'yellow',
  'green',
  'orange',
  'brown',
  'lightblue',
  'purple',
  'grey',
  'black',
  'cian',
];

const Charts = ({ type, title, datasets }) => {
  const chartRef = useRef(null);
  console.log('datasets', datasets);

  useEffect(() => {
    var myChart = new Chart(chartRef.current, {
      type: type ?? 'doughnut',
      data: {
        labels: Object.keys(datasets),
        datasets: [
          {
            label: title,
            data: Object.values(datasets),
            backgroundColor: colors.slice(0, Object.keys(datasets).length),
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)',
            // ],
            // borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);

  return <canvas id="myChart" width="400" height="400" ref={chartRef}></canvas>;
};

export default Charts;
