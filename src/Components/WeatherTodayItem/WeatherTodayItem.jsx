import PropTypes from 'prop-types';
import sunIcon from '../../assets/icons/sun.png'
import styles from './WeatherTodayItem.module.scss';

function WeatherTodayItem({degree}) {
  return (
    <div className={styles.box}>
      <img src={sunIcon} alt='sunny' />
      <div >
        <div className={styles.label}>today</div>
        <div className={styles.degree}>{degree}&deg;</div>
      </div>
    </div>
  )
}

WeatherTodayItem.propTypes = {
  degree: PropTypes.string.isRequired,
}

export default WeatherTodayItem;
