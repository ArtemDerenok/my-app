import { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import setMyOwnCity, { addCityDataOpenWeatherApiThunk, setCurrentCityFromDbThunk , setCurrentCityTnunk , setWeatherDataFromDbThunk } from '../../redux/asyncActions/weather';
import styles from './CityBar.module.scss';
import {getWeatherDataFromOpenWeatherApi} from '../../service/api';
import FormError from '../FormError/FormError';
import CitySelector from '../CitySelector/CitySelector';

function CityBar() {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  
  const changeName = (e) => {
    setCityName(e.target.value);
  }
  
  const handleRequest = async (name) => {
    try {
      const result = await getWeatherDataFromOpenWeatherApi(name.toLowerCase());
      setCityName(result.city.city);
      setCountryName(result.city.country)
      dispatch(setCurrentCityTnunk(result.city));
      dispatch(addCityDataOpenWeatherApiThunk(result));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  
  useEffect(() => {
   const fetchData = async () => {
    let result = await dispatch(setCurrentCityFromDbThunk());
    if (!result) {
      result = await dispatch(setMyOwnCity());
      handleRequest(result.payload.city);
    } 
    setCityName(result.payload.city);
    setCountryName(result.payload.country);
    const r = await dispatch(setWeatherDataFromDbThunk());
    if (r === null) {
      handleRequest(result.payload.city);
    }
   }  
   fetchData();
  }, [])
  
  return (
    <div className={styles.container}>
      <input type="text" placeholder='Enter the name of the city' value={cityName} onChange={changeName} onBlur={() => handleRequest(cityName)} />
      <div className={styles.country}>{countryName}</div>
      <FormError error={errorMessage} />
      <button type='button' onClick={() => getWeatherDataFromOpenWeatherApi('gomel')}>click</button>
      <CitySelector handleRequest={handleRequest} />
    </div>
  )
}

export default CityBar;
