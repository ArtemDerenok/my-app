import { useState, useEffect } from 'react';
import { days, months } from '../../utils/index';
import styles from './Clock.module.scss';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    });

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={styles.clock}>
      <h2 className={styles.time}>{date.toLocaleTimeString()}</h2>
      <div>
        <h3 className={styles.date}>
          {days[date.getDay()]}, {date.getDate()} {months[date.getDate()]} {date.getFullYear()}
        </h3>
      </div>
    </div>
  );
}

export default Clock;
