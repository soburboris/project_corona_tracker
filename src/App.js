import React, { useState } from 'react';

import {CountryPicker, Chart, Cards } from './components';
import {fetchCountries } from './api/';
import styles from './App.module.css';

import image from './images/image.png';

export const App = () => {
  
  const [country, setCountry] = useState('')
  const [data, setData] = useState([])
  
  
 
  const handleCountryChange = async (country) => {
    const data = await fetchCountries(country);
    const Data = data.filter((item)=> item.Province === country)
    
    const  Sort = (arr) => arr.map((item, i) => {
        
         if (i%2 === 0) {
         return  {
           ...item,
          Confirmed:(Data[i+1]?.Confirmed - Data[i]?.Confirmed),
           Active:(Data[i+1]?.Active - Data[i]?.Active),
            Deaths:(Data[i+1]?.Deaths - Data[i]?.Deaths), 
            date:(Data[i+1]?.date), 
            Province:(Data[i]?.Province), 
            Country:(Data[i]?.Country)
          }

          } else if(i%2 === 1) {
         return  {
           ...item,
          Confirmed:(Data[i+1]?.Confirmed - Data[i]?.Confirmed),
           Active:(Data[i+1]?.Active - Data[i]?.Active),
            Deaths:(Data[i+1]?.Deaths - Data[i]?.Deaths), 
            date:(Data[i+1]?.date), 
            Province:(Data[i]?.Province), 
            Country:(Data[i]?.Country)
          }
        } 
        return []
          
      })

    const trueArr = Sort(Data).slice(0,-1)
   
    setData(trueArr);
   
    setCountry(country)
    }
    const year = (new Date()).getFullYear()
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} /> 
        <div className={styles.position}>© Developed by Boris Sobur 2021-{year}</div>
      </div>
    );
  
}

