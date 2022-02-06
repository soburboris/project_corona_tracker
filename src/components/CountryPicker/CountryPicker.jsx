import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  const selectTotal = countries.filter((item) => item.date.slice(0, 10) === (new Date()).toISOString().slice(0, 10)).sort((a, b) => b.Confirmed - a.Confirmed);
  
  
   const textDistrict = (country) => `${country.Province} `

  return (
    <FormControl className={styles.formControl}>
      { selectTotal.length ? (
        <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
          <option value="">Russia</option>
          {Object.values(selectTotal).map((country, i) => 
          (
            <option key={i} value={country.Province}>
              {textDistrict(country)}
            </option>
          )
          )}
        </NativeSelect>
      ) : <div className={styles.textAlign}>Loading...</div> }
    </FormControl>
  );
};

export default Countries;

  