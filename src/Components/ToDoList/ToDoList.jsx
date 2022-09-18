import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllTasks } from '../../redux/asyncActions/tasks';
import Task from '../Task/Task';
import styles from './ToDoList.module.scss';

function ToDoList() {
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setAllTasks());
  }, []);

  return (
    <div className={styles.list}>
      {tasks.map((elem) => (
        <Task key={elem.id} time={elem.time} message={elem.message} />
      ))}
    </div>
  );
}

export default ToDoList;
