import PropTypes from 'prop-types';
import styles from './Task.module.scss';

function Task({ time, message }) {
  return (
    <div className={styles.task}>
      <div className={styles.time}>{time}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
}

Task.propTypes = {
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Task;
