const defaultState = {
  currentCity: null,
  openWeatherApi: null,
  
}

const ADD_CITY_OPEN_WEATHER_API = 'ADD_CITY_OPEN_WEATHER_API';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';
const SET_WEATHER_DATA_OPEN_WEATHER_API = 'SET_WEATHER_DATA_OPEN_WEATHER_API';

const weatherReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CITY_OPEN_WEATHER_API:
      return {...state, openWeatherApi: {...state.openWeatherApi, [action.payload.city.city.toLowerCase()]: action.payload}};
    case SET_CURRENT_CITY:
      return {...state, currentCity: action.payload};
    case SET_WEATHER_DATA_OPEN_WEATHER_API:
      return {...state, openWeatherApi: action.payload};
    default: 
      return state;
  }
}

export const setCurrentCityActionCreator = (payload) => ({type: SET_CURRENT_CITY, payload});
export const addCityOpenWatherApi = (payload) => ({type: ADD_CITY_OPEN_WEATHER_API, payload});
export const setWeatherDataOpenWeatherApiActionCreator = (payload) => ({type: SET_WEATHER_DATA_OPEN_WEATHER_API, payload});

export default weatherReducer;
