const defaultState = {
  tasks: [],
}

const ADD_TASK = 'ADD_TASK';
const CLEAR_TASKS = 'CLEAR_TASKS';
const SET_ALL_TASKS = 'SET_ALL_TASKS';

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: [...state.tasks, action.payload]};
    case CLEAR_TASKS:
      return {tasks: []};
    case SET_ALL_TASKS:
      return {tasks: [...action.payload]}
    default: 
      return state;
  }
}

export const addTaskActionCreator = (payload) => ({type: ADD_TASK, payload});
export const clearAllTasksActionCreator = () => ({type: CLEAR_TASKS});
export const setAllTasksActionCreator = (payload) => ({type: SET_ALL_TASKS, payload})

export default taskReducer;
