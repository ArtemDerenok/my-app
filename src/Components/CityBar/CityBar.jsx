import { useState } from 'react';
import styles from './CityBar.module.scss';

function CityBar() {
  const [cityName, setCityName] = useState('Gomel');
  
  const changeName = (e) => {
    setCityName(e.target.value);
  }
  
  return (
    <div className={styles.container}>
      <input type="text" placeholder='Enter the name of the city' value={cityName} onChange={changeName} />
      <div className={styles.country}>Belarus</div>
    </div>
  )
}

export default CityBar;
