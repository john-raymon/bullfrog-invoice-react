import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from '../state/reducers'
import { createBrowserHistory } from 'history'
// middlewares
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();
const configureStore = (persistedState) => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)]
	return createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(...middlewares))
    )
}

export default configureStore
