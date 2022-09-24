import {
  useState,
  useEffect
} from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import setMyOwnCityThunk, {
  setCurrentCityTnunk,
  getWeatherDataOpenMeteoThunk,
  getCoordinatesThunk,
  setCurrentCityFromDbThunk,
  setWeatherDataOpenMeteoApiFromDbThunk,
  setWeatherDataOpenWeatherApiFromDbThunk,
  getWeatherDataOpenWeatherDataApiThunk
} from "../redux/asyncActions/weather";
import {
  setLoadingValueActionCreator
} from "../redux/reducers/weatherReducer";
import {
  setCurrentCityInDb
} from "../db";
import rainBackground from '../assets/backgrounds/rain.png';
import sunBackground from '../assets/backgrounds/sunny.png';
import snowBackground from '../assets/backgrounds/snow.png';
import cloudBackground from '../assets/backgrounds/cloud.png';

const useWeather = () => {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const weatherData = useSelector(state => state.weatherReducer);
  const background = useSelector(state => state.backgroundReducer.background)
  const dispatch = useDispatch();

  const handleRequestOpenWeatherApi = async (name, api) => {
    try {
      const result = await dispatch(getWeatherDataOpenWeatherDataApiThunk(name, api));
      setCityName(result.payload.city.city);
      setCountryName(result.payload.city.country)
      dispatch(setCurrentCityTnunk(result.payload.city));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      dispatch(setLoadingValueActionCreator(false))
    }
  }

  const handleRequestOpenMeteoApi = async (data, api) => {
    const result = await dispatch(getWeatherDataOpenMeteoThunk(data, api));
    await setCurrentCityInDb('settings', result.payload.city)
  }

  const getCoordinadtesOpenMeteoApi = async (name, api) => {
    try {
      const result = await dispatch(getCoordinatesThunk(name));
      setCityName(result.payload.city);
      setCountryName(result.payload.country)
      setErrorMessage(null);
      await handleRequestOpenMeteoApi(result.payload, api);
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      dispatch(setLoadingValueActionCreator(false))
    }
  }

  const handleRequest = async (name, api) => {
    dispatch(setLoadingValueActionCreator(true))
    if (api === 'openWeatherApi') {
      handleRequestOpenWeatherApi(name, api);
    } else if (api === 'openMeteo') {
      await getCoordinadtesOpenMeteoApi(name, api);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await dispatch(setCurrentCityFromDbThunk());
      if (!result) {
        result = await dispatch(setMyOwnCityThunk());
      }
      setCityName(result.payload.city);
      setCountryName(result.payload.country);
      dispatch(setWeatherDataOpenMeteoApiFromDbThunk());
      dispatch(setWeatherDataOpenWeatherApiFromDbThunk());
      handleRequest(result.payload.city, weatherData.currentApi);
    }
    fetchData();
  }, [])

  const setBackground = (back) => {
    let result;
    if (back === 'Clear' || back === 'MainlyClear') {
      result = sunBackground;
    } else if (back === 'CloudSunRain' || back === 'Mist' || back === 'Clouds') {
      result = cloudBackground;
    } else if (back === 'Rain' || back === 'Thunderstorm') {
      result = rainBackground;
    } else if (back === 'Snow') {
      result = snowBackground;
    }
    return result
  }

  return {
    setBackground,
    background,
    handleRequest,
    cityName,
    countryName,
    errorMessage,
    setCityName,
    weatherData
  }
}

export default useWeather;
