// import status from './status'
// import genericPage from './genericPage'
// import contents from './contents'
// import application from './application'
// export default {status, genericPage, contents, application}

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default (history) => {
  return combineReducers({
    testState: (state = {}, action) => {
      return state;
    },
    router: connectRouter(history)
  })
}
