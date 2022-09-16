import { addCityOpenMeteoApi, addCityOpenWatherApi, setCurrentCityActionCreator, setWeatherDataOpenMeteoActionCreator, setWeatherDataOpenWeatherApiActionCreator } from '../reducers/weatherReducer';
import getMyOwnCityByIp, { getCityCoordinates, getWeatherDataFromOpenMeteoApi } from "../../service/api";
import {getAllWeatherDataOpenMeteoApiFromDb, getAllWeatherDataOpenWeatherApiFromDb, getCurrentCityFromDb, setCurrentCityInDb, setWatherDataOpenWeatherApiInDb , setWeatherDataOpenMeteoApiInDb } from "../../db/index";
import { formatData } from '../../utils';



const setMyOwnCityThunk = () => async (dispatch) => {
  const data = await getMyOwnCityByIp();
  await setCurrentCityInDb('settings', data)
  return dispatch(setCurrentCityActionCreator(data));
}

export const setCurrentCityTnunk = (data) => async (dispatch) => {
  await setCurrentCityInDb('settings', data);
  return dispatch(setCurrentCityActionCreator(data))
}

export const addCityDataOpenWeatherApiThunk = (data) => async (dispatch) => {
  await setWatherDataOpenWeatherApiInDb(data.city.city, data);
  return dispatch(addCityOpenWatherApi(data));
}

export const setWeatherDataOpenWeatherApiFromDbThunk = () => async (dispatch) => {
  const data = await getAllWeatherDataOpenWeatherApiFromDb();
  if (data.length) {
    const result = formatData(data);
    return dispatch(setWeatherDataOpenWeatherApiActionCreator(result));
  } 
  return null;
}

export const setWeatherDataOpenMeteoApiFromDbThunk = () => async (dispatch) => {
  const data = await getAllWeatherDataOpenMeteoApiFromDb();
  if (data.length) {
    const result = formatData(data);
    return dispatch(setWeatherDataOpenMeteoActionCreator(result));
  }
  return null
}

export const setCurrentCityFromDbThunk = () => async (dispatch) => {
  const data = await getCurrentCityFromDb('settings');
  if(data) {
    return dispatch(setCurrentCityActionCreator(data));
  } 
    return null;
}

export const getCoordinatesThunk = (data) => async (dispatch) => {
  try {
    const coordinates = await getCityCoordinates(data);
    return dispatch(setCurrentCityActionCreator(coordinates))
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getWeatherDataOpenMeteoThunk = (data, api) => async (dispatch) => {
  try {
    const result = await getWeatherDataFromOpenMeteoApi(data, api);
    await setWeatherDataOpenMeteoApiInDb(result.city.city, result);
    return dispatch(addCityOpenMeteoApi(result));
  } catch (error) {
    throw new Error(error.message);
  }
}

export default setMyOwnCityThunk;
