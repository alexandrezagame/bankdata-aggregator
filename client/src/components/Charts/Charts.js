import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import useStyles from './styles';
import Emoji from '../emoji';

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
  const classes = useStyles();

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

  return (
    <div className={classes.chart}>
      <h3 className={classes.title}>
        Your total expenses per category:
        <Emoji symbol="📊" label="Bar chart" />
      </h3>
      <canvas id="myChart" width="200" height="200" ref={chartRef}></canvas>
    </div>
  );
};

export default Charts;
