import auth from './auth'

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default (history) => {
  return combineReducers({
    auth,
    router: connectRouter(history)
  })
}
