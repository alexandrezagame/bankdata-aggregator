import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import useStyles from './styles';
import Emoji from '../emoji';

const colors = [
  '#6F2DBD',
  '#A663CC',
  '#B298DC',
  '#B8D0EB',
  '#B9FAF8',
  '#FF0054',
  '#324376',
  '#A7E8BD',
  '#B9314F',
  '#CEFF1A',
  '#FB8B24',
  '#136F63',
  '#032B43',
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
            borderWidth: 1,
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
        Total expenses per category:
        <Emoji symbol="📊" label="Bar chart" />
      </h3>
      <canvas id="myChart" width="200" height="200" ref={chartRef}></canvas>
    </div>
  );
};

export default Charts;
