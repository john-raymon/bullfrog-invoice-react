import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../state/reducers'
import agent from './agent'
import localforage from 'localforage'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// middlewares
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
}

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

const localStorageMiddleware = store => next => action => {
  const validActions = ["INIT_APP"]
  if (action.type === "LOGIN_FULLFILLED") {
    if (!action.error) {
      localforage.setItem('jwt', action.payload.token)
      agent.setToken(action.payload.token);
    }
  } else if (action.type === "LOGOUT" || action.type === "EXPIRED") {
    localforage.setItem('jwt', '');
    agent.setToken(null);
  } else if ( validActions.includes(action.type) ) {
    agent.setToken(store.getState().auth.token)
  }
  next(action);
};

const configureStore = (persistedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunkMiddleware, logger, promiseMiddleware, localStorageMiddleware, routerMiddleware(history)]
	let store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(...middlewares))
    )
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
