import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clock from "./Components/Clock/Clock";
import ToDoList from "./Components/ToDoList/ToDoList";
import WeatherTable from "./Components/WeatherTable/WeatherTable";
import styles from './App.module.scss';
import CityBar from "./Components/CityBar/CityBar";
import NewTaskForm from "./Components/NewTaskForm/NewTaskForm";
import setMyOwnCityThunk, { addCityDataOpenWeatherApiThunk, getCoordinatesThunk, setCurrentCityTnunk, getWeatherDataOpenMeteoThunk, setCurrentCityFromDbThunk, setWeatherDataOpenMeteoApiFromDbThunk, setWeatherDataOpenWeatherApiFromDbThunk } from './redux/asyncActions/weather';
import { setCurrentCityInDb } from './db/index';
import { getWeatherDataFromOpenWeatherApi } from './service/api';
import Spinner from './Components/Spinner/Spinner';
import { setLoadingValueActionCreator } from './redux/reducers/weatherReducer';
import rainBackground from './assets/backgrounds/rain.png';
import sunBackground from './assets/backgrounds/sunny.png';
import snowBackground from './assets/backgrounds/snow.png';
import cloudBackground from './assets/backgrounds/cloud.png';

function App() {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const weatherData = useSelector(state => state.weatherReducer);
  const background = useSelector(state => state.backgroundReducer.background)
  const dispatch = useDispatch();
    
  const handleRequestOpenWeatherApi = async (name) => {
    try {
      const result = await getWeatherDataFromOpenWeatherApi(name.toLowerCase(), weatherData.currentApi);
      setCityName(result.city.city);
      setCountryName(result.city.country)
      dispatch(setCurrentCityTnunk(result.city));
      dispatch(addCityDataOpenWeatherApiThunk(result));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      dispatch(setLoadingValueActionCreator(false))
    }
  }
  
  const handleRequestOpenMeteoApi = async (data) => {
    const result = await dispatch(getWeatherDataOpenMeteoThunk(data, weatherData.currentApi));
    await setCurrentCityInDb('settings', result.payload.city)
  }
  
  const getCoordinadtesOpenMeteoApi = async (name) => {
    try {
      const result = await dispatch(getCoordinatesThunk(name));
      setCityName(result.payload.city);
      setCountryName(result.payload.country)
      setErrorMessage(null);
      handleRequestOpenMeteoApi(result.payload);
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      dispatch(setLoadingValueActionCreator(false))
    }
  }
  
  const handleRequest = async (name, api) => {
    dispatch(setLoadingValueActionCreator(true))
    if (api === 'openWeatherApi') {
      handleRequestOpenWeatherApi(name);
    } else if (api === 'openMeteo') {
        await getCoordinadtesOpenMeteoApi(name);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
     let result = await dispatch(setCurrentCityFromDbThunk());
     if (!result) {
       result = await dispatch(setMyOwnCityThunk());
       handleRequest(result.payload.city, weatherData.currentApi);
     } 
     setCityName(result.payload.city);
     setCountryName(result.payload.country);
     const resultOne = await dispatch(setWeatherDataOpenMeteoApiFromDbThunk());
     const resultTwo = await dispatch(setWeatherDataOpenWeatherApiFromDbThunk());
     if (resultOne === null || resultTwo === null) {
       handleRequest(result.payload.city, weatherData.currentApi);
     }
    }  
    fetchData();
   }, [])
  
  const setBackground = (back) => {
    let result;
    if (back === 'Clear' || back === 'MainlyClear') {
      result = sunBackground;
    } else if (back === 'CloudSunRain' || back === 'Mist' || back === 'Clouds') {
      result = cloudBackground;
    } else if (back === 'Rain'|| back === 'Thunderstorm') {
      result = rainBackground;
    } else if (back === 'Snow') {
      result = snowBackground;
    }
    return result
  }
   
   
  return (
    <main className={styles.container} style={{backgroundImage: `url(${setBackground(background)})`}}>
      <div className={styles.boxOne}>
        <div className={styles.clockContainer}>
          <Clock />
          <NewTaskForm />
          <ToDoList />
        </div>
        <div className={styles.cityContainer}>
          <CityBar handleRequest={handleRequest} cityName={cityName} countryName={countryName} errorMessage={errorMessage} setCityName={setCityName} />
        </div>
      </div>
      <div>
        <WeatherTable handleRequest={handleRequest} cityName={cityName} />
      </div>
      {weatherData.loading ? <Spinner /> : null}
    </main>
  );
}

export default App;
