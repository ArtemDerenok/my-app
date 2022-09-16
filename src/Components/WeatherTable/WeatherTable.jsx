import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import styles from './WeatherTable.module.scss';
import WeatherItem from '../WeatherItem/WeatherItem';
import WeatherTodayItem from '../WeatherTodayItem/WeatherTodayItem';
import { getWeatherDescription } from '../../utils';


function WeatherTable({handleRequest, cityName}) {  
  const data = useSelector(state => state.weatherReducer);  
  const firstElement = [];
  let content = <div className={styles.updateContainer}><p>Update data please</p><button type='button' onClick={() => handleRequest(cityName, data.currentApi)}> </button></div>;
  
  if (data.currentApi === 'openWeatherApi') {
    if(data.currentCity !== null && data.openWeatherApi !== null) {
      if (data.currentCity.city.toLowerCase() in data.openWeatherApi) {
        content = data.openWeatherApi[data.currentCity.city.toLowerCase()].list.map((elem, index) => {
          if (index === 0) {
            firstElement.push(<WeatherTodayItem key={nanoid()} degree={elem.main.temp} description={elem.weather[0].main} weatherId={elem.weather[0].id} />)
          }
          return <WeatherItem key={nanoid()} day={elem.dt_txt.slice(0, 10)} degree={elem.main.temp} description={elem.weather[0].main} weatherId={elem.weather[0].id} />
        })
      }
    }
  } else if (data.currentApi === 'openMeteo') {
    if(data.currentCity !== null && data.openMeteo !== null) {
      if (data.currentCity.city.toLowerCase() in data.openMeteo) {
        content = data.openMeteo[data.currentCity.city.toLowerCase()].list.map((elem, index) => {
          if (index === 0) {
            firstElement.push(<WeatherTodayItem key={nanoid()} degree={elem.temp} description={getWeatherDescription(elem.weathercode)} />)
          }
          return <WeatherItem key={nanoid()} day={elem.day} degree={elem.temp} description={getWeatherDescription(elem.weathercode)} />
        })
      }
    }
  }
  
  return (
    <div className={styles.box}>{firstElement}<div className={styles.otherDaysBox}>{content}</div></div>
  )
}

WeatherTable.propTypes = {
  handleRequest: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired,
}

export default WeatherTable;
