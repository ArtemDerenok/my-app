import styles from './NewTaskBar.module.scss';

function NewTaskBar() {
  return (
    <input className={styles.input} type="text" placeholder='Enter a new task' />
  )
}

export default NewTaskBar;
