import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// Reducers
import auth from './auth'
import status from './status'
import errors from './errors'
import dashboard from './dashboard'
import globals from './globals'

export default (history) => {
  return combineReducers({
    auth,
    status,
    errors,
    dashboard,
    globals,
    router : connectRouter(history)
  })
}
