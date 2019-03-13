import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../state/reducers'
import agent from './agent'
import localforage from 'localforage'
import { createBrowserHistory } from 'history'
// middlewares
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

const localStorageMiddleware = store => next => action => {
  if (action.type === "LOGIN_FULLFILLED") {
    if (!action.error) {
      localforage.setItem('jwt', action.payload.token)
      agent.setToken(action.payload.token);
    }
  } else if (action.type === "LOGOUT" || action.type === "EXPIRED") {
    localforage.setItem('jwt', '');
    agent.setToken(null);
  }
  next(action);
};

const configureStore = (persistedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunkMiddleware, logger, promiseMiddleware, localStorageMiddleware, routerMiddleware(history)]
	return createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(...middlewares))
    )
}

export default configureStore
