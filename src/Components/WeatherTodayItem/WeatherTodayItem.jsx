import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setBackgroundValueActionCreator } from '../../redux/reducers/backgroundReducer';
import styles from './WeatherTodayItem.module.scss';

function WeatherTodayItem({ degree, description, weatherId }) {
  let img = description;
  const dispatch = useDispatch();

  if (weatherId >= 700 && weatherId < 800) {
    img = 'Mist';
  }

  useEffect(() => {
    dispatch(setBackgroundValueActionCreator(img));
  }, []);

  return (
    <div className={styles.box}>
      <img src={`${process.env.PUBLIC_URL}/icons/${img}.png`} alt={img} />
      <div>
        <div className={styles.label}>today</div>
        <div className={styles.degree}>{degree}&deg;</div>
      </div>
    </div>
  );
}

WeatherTodayItem.defaultProps = {
  weatherId: null,
};

WeatherTodayItem.propTypes = {
  degree: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  weatherId: PropTypes.number,
};

export default WeatherTodayItem;
