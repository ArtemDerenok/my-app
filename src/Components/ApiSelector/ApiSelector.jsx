import { useDispatch, useSelector } from 'react-redux';
import { setCurrentApiActionCreator } from '../../redux/reducers/weatherReducer';
import styles from './ApiSelector.module.scss';

function ApiSelector() {
  const data = useSelector(state => state.weatherReducer);
  const dispatch = useDispatch();
  
  const handleOptions = (e) => {
    localStorage.setItem('api', e.target.value);
    dispatch(setCurrentApiActionCreator(e.target.value));
  }
  
  return (
    <select className={styles.select} onChange={handleOptions} defaultValue=''>
      <option disabled hidden value=''>Select Api</option>
      <option value={data.api.openWeatherApi}>OpenWeather</option>
      <option value={data.api.openMeteo}>Open-meteo</option>
    </select>
  )
}

export default ApiSelector;
