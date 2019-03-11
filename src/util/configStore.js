import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../state/reducers'
import { createBrowserHistory } from 'history'
// middlewares
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();
const configureStore = (persistedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunkMiddleware, logger, routerMiddleware(history)]
	return createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(...middlewares))
    )
}

export default configureStore
