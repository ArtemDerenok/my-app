import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk'
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import taskReducer from '../reducers/tasksReducer';
import weatherReducer from '../reducers/weatherReducer';
import backgroundReducer from '../reducers/backgroundReducer';

const rootReducer = combineReducers({
  taskReducer,
  weatherReducer,
  backgroundReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
