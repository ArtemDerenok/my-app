/* eslint-disable default-param-last */
const defaultState = {
  tasks: [],
}

const ADD_TASK = 'ADD_TASK';
const CLEAR_TASKS = 'CLEAR_TASKS';

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: [...state.tasks, action.payload]};
    case CLEAR_TASKS:
      return {tasks: []};
    default: 
      return state;
  }
}

export const addTaskActionCreator = (payload) => ({type: ADD_TASK, payload});
export const clearAllTasksActionCreator = () => ({type: CLEAR_TASKS});

export default taskReducer;
