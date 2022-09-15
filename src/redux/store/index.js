import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import taskReducer from '../reducers/tasksReducer';
import weatherReducer from '../reducers/weatherReducer';

const rootReducer = combineReducers({
  taskReducer,
  weatherReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
