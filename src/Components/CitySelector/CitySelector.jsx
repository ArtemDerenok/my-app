import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import styles from './CitySelector.module.scss';

function CitySelector({ handleRequest }) {
  const [optionValue, setOptionValue] = useState('');
  const weatherData = useSelector((state) => state.weatherReducer);

  return (
    <select
      className={styles.select}
      value={optionValue}
      onChange={(e) => {
        handleRequest(e.target.value, weatherData.currentApi);
        setOptionValue(e.target.value);
      }}
    >
      <option disabled hidden value="">
        Select city
      </option>
      {weatherData[weatherData.currentApi] !== null
        ? Object.keys(weatherData[weatherData.currentApi]).map((elem) => (
            <option key={nanoid()} value={elem}>{`${elem[0].toUpperCase()}${elem.slice(
              1,
            )}`}</option>
          ))
        : null}
    </select>
  );
}

CitySelector.propTypes = {
  handleRequest: PropTypes.func.isRequired,
};

export default CitySelector;
