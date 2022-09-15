import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

function CitySelector({handleRequest}) {
  const data = useSelector(state => state.weatherReducer);
  
  return (
    <select onChange={(e) => handleRequest(e.target.value)}>
      <option value=''>Select an option</option>
      {data.openWeatherApi !== null ? 
      Object.keys(data.openWeatherApi).map((elem) => <option key={nanoid()} value={elem}>{`${elem[0].toUpperCase()}${elem.slice(1)}`}</option>)  
    : null}
    </select>
  )
}


CitySelector.propTypes = {
  handleRequest: PropTypes.func.isRequired,
}


export default CitySelector;
