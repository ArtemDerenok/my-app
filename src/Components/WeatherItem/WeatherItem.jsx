import PropTypes from 'prop-types';
import { days } from '../../utils/index';
import styles from './WeatherItem.module.scss';

function WeatherItem({ day, degree, description, weatherId }) {
  let img = description;

  if (weatherId >= 700 && weatherId < 800) {
    img = 'Mist';
  }

  return (
    <div className={styles.item}>
      <div className={styles.day}>{days[new Date(Date.parse(day)).getDay()]}</div>
      <img src={`${process.env.PUBLIC_URL}/icons/${img}.png`} alt={img} />
      <div className={styles.degree}>{degree}&deg;</div>
    </div>
  );
}

WeatherItem.defaultProps = {
  weatherId: null,
};

WeatherItem.propTypes = {
  day: PropTypes.string.isRequired,
  degree: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  weatherId: PropTypes.number,
};

export default WeatherItem;
