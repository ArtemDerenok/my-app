/* eslint-disable no-debugger */
import { compareTime, prepareData, prepareDataForOpenMeteoApi } from "../utils/index";
import { getWeatherDataOpenMeteoApiFromDb, getWeatherDataOpenWeatherApiFromDb } from './index';

const createCache = async (request, api, cityData = undefined) => {
  const cache = await caches.open('my-cache');
  const responce = await cache.match(request);
  if(!responce) {
    try {
      await cache.add(request);
      const res = await cache.match(request);
      const data = await res.json();
      const result = api === 'openWeatherApi' ? prepareData(data) : prepareDataForOpenMeteoApi(data, cityData)
      return result;
    } catch (error) {
      throw new Error('Something went wrong. Try a different city name');
    }
  } else {
    const data = await responce.json()
    let result;
       
  
    if (api === 'openWeatherApi') {
      result = await getWeatherDataOpenWeatherApiFromDb(data.city.name)
    } else if (api === 'openMeteo') {
      result = await getWeatherDataOpenMeteoApiFromDb(cityData.city);
    }
    
    debugger
    let isCleanCash = false;
    if (result) {
      isCleanCash = compareTime(Date.now(), result.timestamp);
    } else if (api === 'openWeatherApi') {
      result = prepareData(data)
     } else if (api === 'openMeteo') {
       result = prepareDataForOpenMeteoApi(data, cityData)
     }
    
    if (isCleanCash) {
      try {
        await cache.delete(request)
        await cache.add(request)
        const res = await cache.match(request);
        const dataObj = await res.json();
        let resultObj;
        
        if (api === 'openWeatherApi') {
         resultObj = prepareData(dataObj)
        } else if (api === 'openMeteo') {
          resultObj = prepareDataForOpenMeteoApi(dataObj, cityData)
        }
        
        return resultObj;
      } catch (error) {
        throw new Error('Something went wrong. Try a different city name');
      }
    } 
    return result
  }
}

export default createCache;
