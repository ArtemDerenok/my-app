import axios from 'axios';
import filterWeatherData, { compareTime } from '../utils';
import { getWeatherDataOpenWeatherApiFromDb } from "../db/index";

const OPEN_WEATHER_API_KEY = '648f53fe51358788a8efa96bcf72b550';
let cache
const getMyOwnCityByIp = async () => {
  const responce = await axios.get('http://ipwho.is/?fields=country,city,latitude,longitude');
  return responce.data;
}

const regionNames = new Intl.DisplayNames(
  ['en'], {type: 'region'}
);

const prepareData = (data) => {
  const result = {
    city: {
      city: data.city.name,
      country: regionNames.of(data.city.country),
      latitude: data.city.coord.lat,
      longitude: data.city.coord.lon,
    },
    list: filterWeatherData(data.list),
    timestamp: Date.now(),
  }
  return result;
}

export const getWeatherDataFromOpenWeatherApi = async (city) => {
  const request = new Request(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
  cache = await caches.open('my-cache');
  const responce = await cache.match(request);
  if(!responce) {
    try {
      await cache.add(request);
      const res = await cache.match(request);
      const data = await res.json();
      const result = prepareData(data);
      return result;
    } catch (error) {
      throw new Error('Something went wrong. Try a different city name');
    }
  } else {
    const data = await responce.json()
    let result = await getWeatherDataOpenWeatherApiFromDb(data.city.name);
    
    const isCleanCash = compareTime(Date.now(), result.timestamp);
    if (isCleanCash) {
      try {
        await cache.delete(request)
        await cache.add(request)
        const res = await cache.match(request);
        const dataObj = await res.json();
        const resultObj = prepareData(dataObj);
        return resultObj;
      } catch (error) {
        throw new Error('Something went wrong. Try a different city name');
      }
    } else {
      if (!result) {
        result = prepareData(data);
      }
      return result;
    }
  }
}

export default getMyOwnCityByIp;
