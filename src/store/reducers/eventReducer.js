import {
  GET_EVENT_DATA,
  GET_EVENT_ERROR,
  SWITCH_GRID,
  TRACK_EVENT,
  SET_SORTED_EVENTS,
  UN_TRACK_EVENT,
} from '../actionTypes';

const initialState = {data: [], numColumn: 1, error: null};

export const eventReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_EVENT_DATA:
      return {
        ...state,
        data: payload.data,
      };
    case GET_EVENT_ERROR:
      return {...state, data: null, error: payload};
    case SWITCH_GRID:
      return {...state, numColumn: state.numColumn === 1 ? 2 : 1};
    default:
      return state;
  }
};

export const trackingReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case TRACK_EVENT:
      const data = payload.event;

      const arr =
        payload.name && state[payload.name]
          ? state[payload.name].filter(
              (event) => event.eventId !== data.eventId,
            )
          : [];
      return {...state, [payload.name]: [...arr, data]};

    case UN_TRACK_EVENT:
      const eventToDelete = payload.event;
      const outArr =
        payload.name && state[payload.name]
          ? state[payload.name].filter(
              (event) => event.eventId !== eventToDelete.eventId,
            )
          : [];
      return {...state, [payload.name]: outArr};

    case SET_SORTED_EVENTS:
      const userName = payload.name;
      const events = payload.events;
      return {
        ...state,
        [userName]: events,
      };

    default:
      return state;
  }
};
