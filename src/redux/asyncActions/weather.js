import { addCityOpenWatherApi, setCurrentCityActionCreator , setWeatherDataOpenWeatherApiActionCreator } from '../reducers/weatherReducer';
import getMyOwnCityByIp from "../../service/api";
import {getAllWeatherDataOpenWeatherApiFromDb, getCurrentCityFromDb, setCurrentCityInDb, setWatherDataOpenWeatherApiInDb } from "../../db/index";
import { formatData } from '../../utils';


const setMyOwnCityThunk = () => async (dispatch) => {
  const data = await getMyOwnCityByIp();
  await setCurrentCityInDb('currentCity', data)
  return dispatch(setCurrentCityActionCreator(data));
}

export const setCurrentCityTnunk = (data) => async (dispatch) => {
  await setCurrentCityInDb('currentCity', data);
  return dispatch(setCurrentCityActionCreator(data))
}

export const addCityDataOpenWeatherApiThunk = (data) => async (dispatch) => {
  await setWatherDataOpenWeatherApiInDb(data.city.city, data);
  return dispatch(addCityOpenWatherApi(data));
}

export const setWeatherDataFromDbThunk = () => async (dispatch) => {
  const data = await getAllWeatherDataOpenWeatherApiFromDb();
  if (data.length) {
    const result = formatData(data);
    return dispatch(setWeatherDataOpenWeatherApiActionCreator(result));
  } 
  return null;
}

export const setCurrentCityFromDbThunk = () => async (dispatch) => {
  const data = await getCurrentCityFromDb('currentCity');
  if(data) {
    return dispatch(setCurrentCityActionCreator(data));
  } 
    return null;
}

export default setMyOwnCityThunk;
