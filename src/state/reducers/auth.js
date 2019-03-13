const initialState = {
  isAuth: false,
  loading: false,
  token: null
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    case `${"LOGIN"}_FULFILLED`:
      return {...state, token: payload.token, isAuth: payload.isAuth, loading: false}
    case `${"LOGIN"}_PENDING`:
      return {...state, loading: true}
    case `${"LOGIN"}_REJECTED`:
      return {...state, token: null, isAuth: false, loading: false}
    case "CHANGE":
      return {...state, isAuth: true}
    default:
      return state;
  }
}


// thunk action creators
