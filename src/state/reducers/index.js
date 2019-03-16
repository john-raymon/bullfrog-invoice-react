import auth from './auth'
import status from './status'

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default (history) => {
  return combineReducers({
    auth,
    status,
    router: connectRouter(history)
  })
}
