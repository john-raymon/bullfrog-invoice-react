const initialState = {
  isAuth: false,
  loading: false,
  token: null
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    case `${"LOGIN"}_FULFILLED`:
      return {...state, token: payload.token, isAuth: true}
    case `${"LOGIN"}_PENDING`:
      return {...state, loading: true}
    case "CHANGE":
      return {...state, isAuth: true}
    default:
      return state;
  }
}


// thunk action creators
