import React, { useState, useEffect } from 'react';
import { Line} from 'react-chartjs-2';


import {fetchMyAPI} from '../../selector'
import styles from './Chart.module.css';

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    
     async function fetchData() {
    // You can await here
    setDailyData(await fetchMyAPI());
    // ...
  }
  fetchData();
    
  }, []);
 

  const barChart = (
    data ? (
      <Line
        data={{
          labels: data.map((date) => new Date(date?.date).toLocaleDateString()),
          datasets: [{
            data: data.map((data) => data?.Confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, 
          {
            data: data.map((data) => (data?.Confirmed - data?.Deaths)),
            label: 'Active',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          {
            data: data.map((data) => data?.Deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, 
          ],
        }}
      />
    ) : null
  );

  const lineChart = (

    dailyData[0] ? (
      <Line
        data={{
          labels: Object.values(dailyData).map((date) => new Date(date.date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.Confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map((data) => (data.Confirmed - data.Deaths)),
            label: 'Active',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
           {
            data: dailyData.map((data) => data.Deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, 
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
