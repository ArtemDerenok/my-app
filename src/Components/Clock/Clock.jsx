import { useState,useEffect } from "react";
import styles from './Clock.module.scss';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function Clock() {
  const [date, setDate] = useState(new Date());
  
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    })
    
    return () => clearInterval(timerId)
  }, [])
  
  return (
    <div className={styles.clock}>
      <div className={styles.time}>{date.toLocaleTimeString()}</div>
      <div>
        <span className={styles.date}>{days[date.getDay()]}, {date.getDate()} {months[date.getDate()]} {date.getFullYear()}</span>
        </div>
    </div>
  )
}

export default Clock;
