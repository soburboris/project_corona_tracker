import axios from 'axios';

export const fetchDailyData = async () => {

  try {
    const { data } = await axios.get(`https://api.covid19api.com/total/dayone/country/russia`);

    return data.map(({ Confirmed, Active, Deaths, Date, Country }) => ({ Confirmed, Active, Deaths, date: Date, Country }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`https://api.covid19api.com/live/country/russia`);

    return data.map(({ Confirmed, Deaths, Date, Country, Active, Province }) => ({ Confirmed, Deaths, date: Date, Country, Active, Province }))
  } catch (error) {
    return error;
  }
};

