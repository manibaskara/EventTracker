import {getEvents} from '../../services/api';
import {
  GET_EVENT_DATA,
  GET_EVENT_ERROR,
  SWITCH_GRID,
  SET_SORTED_EVENTS,
  TRACK_EVENT,
  UN_TRACK_EVENT,
} from '../actionTypes';

export const getEventsAction = () => {
  return async (dispatch) => {
    try {
      const response = await getEvents();
      dispatch({type: GET_EVENT_DATA, payload: response});
    } catch (e) {
      dispatch({
        type: GET_EVENT_ERROR,
        payload: e,
      });
    }
  };
};

export const switchGridAction = () => {
  return {type: SWITCH_GRID};
};
export const trackEventAction = (event) => {
  return async (dispatch, getState) => {
    const name = getState().login.userData.userName;
    dispatch({
      type: TRACK_EVENT,
      payload: {event, name},
    });
  };
};

export const removeEventAction = (event) => {
  return async (dispatch, getState) => {
    const name = getState().login.userData.userName;
    dispatch({
      type: UN_TRACK_EVENT,
      payload: {event, name},
    });
  };
};

export const setSortedEventsAction = (events) => {
  return async (dispatch, getState) => {
    const name = getState().login.userData.userName;
    dispatch({
      type: SET_SORTED_EVENTS,
      payload: {events, name},
    });
  };
};
