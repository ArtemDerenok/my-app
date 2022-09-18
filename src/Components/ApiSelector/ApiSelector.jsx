import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentApiActionCreator } from '../../redux/reducers/weatherReducer';
import styles from './ApiSelector.module.scss';

function ApiSelector({ handleRequest }) {
  const data = useSelector((state) => state.weatherReducer);
  const dispatch = useDispatch();

  const handleOptions = async (e) => {
    localStorage.setItem('api', e.target.value);
    await dispatch(setCurrentApiActionCreator(e.target.value));
    handleRequest(data.currentCity.city, e.target.value);
  };

  return (
    <select className={styles.select} onChange={handleOptions} defaultValue="">
      <option disabled hidden value="">
        Select Api
      </option>
      <option value={data.api.openWeatherApi}>OpenWeather</option>
      <option value={data.api.openMeteo}>Open-meteo</option>
    </select>
  );
}

ApiSelector.propTypes = {
  handleRequest: PropTypes.func.isRequired,
};

export default ApiSelector;
