import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FormError from '../FormError/FormError';
import CitySelector from '../CitySelector/CitySelector';
import ApiSelector from '../ApiSelector/ApiSelector';
import styles from './CityBar.module.scss';

function CityBar({handleRequest, cityName, countryName, errorMessage, setCityName}) {
  const weatherData = useSelector(state => state.weatherReducer);
  
  const changeName = (e) => {
    setCityName(e.target.value);
  }
 
  return (
    <div className={styles.container}>
      <input type="text" placeholder='Enter the name of the city' value={cityName} onChange={changeName} onBlur={() => handleRequest(cityName, weatherData.currentApi)} />
      <div className={styles.country}>{countryName}</div>
      <FormError error={errorMessage} />
      <div className={styles.selectBox}>
        <CitySelector handleRequest={handleRequest} />
        <ApiSelector handleRequest={handleRequest} />
      </div>
    </div>
  )
}


CityBar.defaultProps = {
  errorMessage: null,
}

CityBar.propTypes = {
  handleRequest: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  setCityName: PropTypes.func.isRequired,
}


export default CityBar;
