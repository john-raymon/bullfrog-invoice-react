const initialState = {
  isAuth: false,
  token: null
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    case `${"LOGIN"}_FULFILLED`:
      return {...state, token: payload.token, isAuth: payload.isAuth}
    case "LOGOUT":
    case `${"LOGIN"}_REJECTED`:
      return {...state, token: null, isAuth: false}
    case "CHANGE":
      return {...state, isAuth: true}
    default:
      return state;
  }
}


// thunk action creators
