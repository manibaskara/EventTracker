import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
import {eventReducer, trackingReducer} from './eventReducer';
import {loginReducer} from './loginReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['trackedEvents'],
};

const reducer = combineReducers({
  app: appReducer,
  event: eventReducer,
  trackedEvents: trackingReducer,
  login: loginReducer,
});
export const rootReducer = persistReducer(persistConfig, reducer);
