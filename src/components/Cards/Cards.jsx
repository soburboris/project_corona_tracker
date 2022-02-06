import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

import {fetchMyAPI} from '../../selector'



const Info = ({data}) => {

  const [countries, setCountries] = useState([]);

  useEffect( () => {
   
    async function fetchData() {
    // You can await here
    setCountries(await fetchMyAPI());
    // ...
  }
  fetchData();

  }, []);
  

   const selectTotal = countries[countries?.length -1]
   const selectData = data.filter((item) => item.date?.slice(0, 10) === (new Date()).toISOString().slice(0, 10))[0]
  
  const Province = data?.length ? data[0].Province  : selectTotal?.Country

  
  const cardSubtitle = 'Number of recoveries from COVID-19.'
  const date = selectData ? selectData.date : selectTotal?.date
   const Confirmed = selectData ?selectData.Confirmed : selectTotal?.Confirmed
  
   const Deaths = selectData ? selectData.Deaths : selectTotal?.Deaths
 
  return (
    <>
      {selectTotal ? 
      <div className={styles.container}>
        <Typography gutterBottom variant="h4" component="h2">{Province}</Typography>
      <Grid wrap="nowrap"  container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          daily = {!data.length ? countries[countries.length - 1]?.Confirmed - countries[countries.length - 2]?.Confirmed: null}
      

          
          cardTitle="Infected"
          value={Confirmed}
          lastUpdate={date}
          cardSubtitle={cardSubtitle}
        />
        <CardComponent
          className={styles.recovered}
          daily = {!data.length ? countries[countries.length - 1]?.Active - countries[countries.length - 2]?.Active : null}
          cardTitle="Active"
          value={Confirmed - Deaths}
          lastUpdate={date}
          cardSubtitle={cardSubtitle}
        />
        <CardComponent
          className={styles.deaths}
          daily = {!data.length ? countries[countries.length - 1]?.Deaths - countries[countries.length - 2]?.Deaths : null}
          cardTitle="Deaths"
          value={Deaths}
          lastUpdate={date}
          cardSubtitle={cardSubtitle}
        />
      </Grid>
    </div> : <div className={styles.textAlign}>Loading...</div> }

    </>
    
  );
};

export default Info;
