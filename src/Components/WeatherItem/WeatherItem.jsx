import PropTypes from 'prop-types';
import styles from './WeatherItem.module.scss';
import sunIcon from '../../assets/icons/sun.png'

function WeatherItem({day, degree}) {
  return (
    <div className={styles.item}>
      <div className={styles.day}>{day}</div>
      <img src={sunIcon} alt='sunny' />
      <div className={styles.degree}>{degree}&deg;</div>
    </div>
  )
}

WeatherItem.propTypes = {
  day: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
}

export default WeatherItem;
