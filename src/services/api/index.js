import instance from './instance';
import {GET_EVENTS, LOGIN_USER} from './Paths';
import {IS_LOADING} from '../../store/actionTypes';
import {store} from '../../store';

export const getEvents = async (object) => {
  const response = await getRequest(GET_EVENTS, object);
  return response;
};

export const loginUser = async (object) => {
  const response = await getRequest(LOGIN_USER, object);
  return response;
};

const getRequest = async (url, object) => {
  try {
    store.dispatch({type: IS_LOADING, payload: true});
    const response = await instance.get(url, {params: object});
    store.dispatch({type: IS_LOADING, payload: false});
    return response;
  } catch (err) {
    store.dispatch({type: IS_LOADING, payload: false});
    throw err;
  }
};

const postRequest = async (url, object) => {
  try {
    store.dispatch({type: IS_LOADING, payload: true});
    const response = await instance.post(url, object);
    store.dispatch({type: IS_LOADING, payload: false});
    return response;
  } catch (err) {
    store.dispatch({type: IS_LOADING, payload: false});
    throw err;
  }
};
