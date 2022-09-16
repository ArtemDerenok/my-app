const defaultState = {
  background: 'Clear'
}

const SET_BACKGROUND_VALUE = 'SET_BACKGROUND_VALUE';

const backgroundReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BACKGROUND_VALUE:
      return {...state, background: action.payload}
    default:
      return state
  }
};

export const setBackgroundValueActionCreator = (payload) => ({type: SET_BACKGROUND_VALUE, payload})

export default backgroundReducer
