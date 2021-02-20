import {LOGIN_SUCCESS, LOGIN_ERROR, ON_NAME_CHANGE} from '../actionTypes';
import {loginUser} from '../../services/api';
import {navigate} from '../../navigation/NavigationService';
import Toast from 'react-native-toast-message';
import {isEmpty} from 'lodash';

export const loginAction = (name) => {
  return async (dispatch) => {
    try {
      if (isEmpty(name)) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Enter name to continue.',
        });
      } else {
        const response = await loginUser({name});
        Toast.show({
          text1: 'Login Success',
          position: 'bottom',
        });
        dispatch({type: LOGIN_SUCCESS, payload: response.data.name});
        navigate('DrawerNavigator', {
          screen: 'AppNavigator',
          params: {screen: 'HomeScreen'},
        });
      }
    } catch (e) {
      dispatch({
        type: LOGIN_ERROR,
        payload: e,
      });
    }
  };
};

export const onNameChangeAction = (name) => {
  return {
    type: ON_NAME_CHANGE,
    payload: name,
  };
};
