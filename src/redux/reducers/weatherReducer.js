const setLocalStorage = () => {
  const value = localStorage.getItem('api');
  if (!value) {
    localStorage.setItem('api', 'openWeatherApi')
  }
  return localStorage.getItem('api')
}

setLocalStorage();

const defaultState = {
  currentCity: null,
  openWeatherApi: null,
  openMeteo: null,
  api: {
    openMeteo: 'openMeteo',
    openWeatherApi: 'openWeatherApi',
  },
  currentApi: setLocalStorage(),
  loading: false,
}

const ADD_CITY_OPEN_WEATHER_API = 'ADD_CITY_OPEN_WEATHER_API';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';
const SET_WEATHER_DATA_OPEN_WEATHER_API = 'SET_WEATHER_DATA_OPEN_WEATHER_API';
const SET_CURRENT_API = 'SET_CURRENT_API';
const ADD_CITY_OPEN_METEO_API = 'ADD_CITY_OPEN_METEO_API';
const SET_WEATHER_DATA_OPEN_METEO_API = 'SET_WEATHER_DATA_OPEN_METEO_API';
const SET_LOADING_VALUE = 'SET_LOADING_VALUE';

const weatherReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CITY_OPEN_WEATHER_API:
      return {
        ...state, openWeatherApi: {
          ...state.openWeatherApi,
          [action.payload.city.city.toLowerCase()]: action.payload
        }
      };
    case SET_CURRENT_CITY:
      return {
        ...state, currentCity: action.payload
      };
    case SET_WEATHER_DATA_OPEN_WEATHER_API:
      return {
        ...state, openWeatherApi: action.payload
      };
    case ADD_CITY_OPEN_METEO_API:
      return {
        ...state, openMeteo: {
          ...state.openMeteo,
          [action.payload.city.city.toLowerCase()]: action.payload
        }
      };
    case SET_WEATHER_DATA_OPEN_METEO_API:
      return {
        ...state, openMeteo: action.payload
      }
      case SET_CURRENT_API:
        return {
          ...state, currentApi: action.payload
        }
        case SET_LOADING_VALUE:
          return {
            ...state, loading: action.payload
          }
          default:
            return state;
  }
}

export const setCurrentCityActionCreator = (payload) => ({
  type: SET_CURRENT_CITY,
  payload
});
export const addCityOpenWatherApi = (payload) => ({
  type: ADD_CITY_OPEN_WEATHER_API,
  payload
});
export const setWeatherDataOpenWeatherApiActionCreator = (payload) => ({
  type: SET_WEATHER_DATA_OPEN_WEATHER_API,
  payload
});
export const addCityOpenMeteoApi = (payload) => ({
  type: ADD_CITY_OPEN_METEO_API,
  payload
});
export const setCurrentApiActionCreator = (payload) => ({
  type: SET_CURRENT_API,
  payload
})
export const setWeatherDataOpenMeteoActionCreator = (payload) => ({
  type: SET_WEATHER_DATA_OPEN_METEO_API,
  payload
});
export const setLoadingValueActionCreator = (payload) => ({
  type: SET_LOADING_VALUE,
  payload
});

export default weatherReducer;
