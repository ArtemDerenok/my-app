import PropTypes from 'prop-types';
import styles from './FormError.module.scss';

function FormError({error}) {
  return (
    <p className={styles.error}>{error}</p>
  )
}

FormError.propTypes = {
  error: PropTypes.string.isRequired
}

export default FormError;
