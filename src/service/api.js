/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import axios from 'axios';
import { compareTime, prepareData, regionNames , prepareDataForOpenMeteoApi } from '../utils';
import { getWeatherDataOpenWeatherApiFromDb } from "../db/index";
import createCache from "../db/cache";


const OPEN_WEATHER_API_KEY = '648f53fe51358788a8efa96bcf72b550';


const getMyOwnCityByIp = async () => {
  const responce = await axios.get(`https://ipapi.co/json/`);
  return responce.data;
}


export const getCityCoordinates = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_API_KEY}`)
    debugger
    const result = {
      city: response.data[0].name,
      country: regionNames.of(response.data[0].country),
      latitude: response.data[0].lat,
      longitude: response.data[0].lon
    };
    return result
  } catch (error) {
    throw new Error('Something went wrong. Try a different city name or another API');
  }
}

export const getWeatherDataFromOpenWeatherApi = async (city, api) => {
  const request = new Request(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
  const result = createCache(request, api);
  return result;
}

export const getWeatherDataFromOpenMeteoApi = async (data, api) => {
  const request = new Request(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&weathercode&daily=weathercode,temperature_2m_max&timezone=auto`);
  const result = createCache(request, api, data)
  return result;
}

export default getMyOwnCityByIp;
