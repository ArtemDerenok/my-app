import {
  nanoid
} from 'nanoid'
import clearTasks, {
  getAllTasksFromDb,
  setTask
} from '../../db'
import {
  addTaskActionCreator,
  clearAllTasksActionCreator,
  setAllTasksActionCreator
} from '../reducers/tasksReducer'


const postTaskThunk = (data) => async (dispatch) => {
  const newTask = {
    ...data,
    id: nanoid()
  }
  await setTask(newTask.id, newTask);
  dispatch(addTaskActionCreator(newTask))
}

export const deleteTasksThunk = () => async (dispatch) => {
  await clearTasks();
  dispatch(clearAllTasksActionCreator());
}

export const setAllTasksThunk = () => async (dispatch) => {
  const data = await getAllTasksFromDb();
  dispatch(setAllTasksActionCreator(data));
}

export default postTaskThunk;
