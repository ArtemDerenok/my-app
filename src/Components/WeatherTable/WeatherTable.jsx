import styles from './WeatherTable.module.scss';
import WeatherItem from '../WeatherItem/WeatherItem';
import WeatherTodayItem from '../WeatherTodayItem/WeatherTodayItem';


function WeatherTable() {
  return (
    <div className={styles.box}>
      <WeatherTodayItem degree='10' />
      <WeatherItem day='Mon' degree='10' />
      <WeatherItem day='Mon' degree='10' />
      <WeatherItem day='Mon' degree='10' />
      <WeatherItem day='Mon' degree='10' />
      <WeatherItem day='Mon' degree='10' />
    </div>
  )
}

export default WeatherTable;
