import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import { Chart as ChartJS } from 'chart.js/auto';
import './LineGraph.css';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  //   scales: {
  //     xAxes: [
  //       {
  //         type: 'time',
  //         time: {
  //           format: 'MM/DD/YY',
  //           tooltipFormat: 'll',
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //         ticks: {
  //           // Include a dollar sign in the ticks
  //           callback: function (value, index, values) {
  //             return numeral(value).format('0a');
  //           },
  //         },
  //       },
  //     ],
  //   },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint >= 0) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ caseType }) {
  const [data, setData] = useState({});

  //   const buildChartData = (datas, caseType = 'cases') => {
  //     let newCases = [];
  //     let previousDate = 0;
  //     for (let data in datas.cases) {
  //       let newObject = {
  //         x: data,
  //         y: datas[caseType][data] - datas[caseType][previousDate],
  //       };

  //       previousDate = data;
  //       newCases.push(newObject);
  //     }
  //     return newCases;
  //   };

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((res) => res.json())
        .then((datas) => {
          const chartData = buildChartData(datas, caseType);
          console.log('chartData', chartData);
          setData(chartData);
        });
    };
    fetchData();
  }, [caseType]);

  return (
    <div className="chartStyle">
      <h3>WorlWide New {caseType}</h3>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: 'WorldWide new cases',
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
