import { nanoid } from 'nanoid'
import clearTasks, { setTask } from '../../db'
import { addTaskActionCreator, clearAllTasksActionCreator } from '../reducers/tasksReducer'

const postTask = (data) => async (dispatch) => {
    const newTask = {...data, id: nanoid()}
    await setTask(newTask.id, newTask);
    dispatch(addTaskActionCreator(newTask))
}

export const deleteTasks = () => async (dispatch) => {
  await clearTasks();
  dispatch(clearAllTasksActionCreator());
}
  

export default postTask;
