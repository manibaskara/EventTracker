import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {persistStore} from 'redux-persist';

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
