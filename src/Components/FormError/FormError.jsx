import PropTypes from 'prop-types';
import styles from './FormError.module.scss';

function FormError({error}) {
  return (
    <p className={styles.error}>{error}</p>
  )
}

FormError.defaultProps = {
  error: null,
}

FormError.propTypes = {
  error: PropTypes.string,
}

export default FormError;
