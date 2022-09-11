import Task from '../Task/Task';
import styles from './ToDoList.module.scss';

function ToDoList() {
  return (
    <div className={styles.list}>
      <Task time='18:00' message='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />
      <Task time='18:00' message='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />
      <Task time='18:00' message='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />
      <Task time='18:00' message='Lorem ipsum dolor sit amet, consectetur adipiscing elit' />
    </div>
  )
}

export default ToDoList;
