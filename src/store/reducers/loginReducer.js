import {LOGIN_SUCCESS, LOGIN_ERROR, ON_NAME_CHANGE} from '../actionTypes';

const initialState = {
  userData: {userName: '', isLoggedIn: false},
  name: '',
  error: null,
  isLoading: false,
};

export const loginReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: {userName: payload, isLoggedIn: true},
        name: '',
        error: null,
      };
    case LOGIN_ERROR:
      return {...state, name: null, error: payload, isLoading: false};
    case ON_NAME_CHANGE:
      return {
        ...state,
        name: payload,
      };
    default:
      return state;
  }
};
