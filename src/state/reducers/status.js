const initialState = {
  authLoading: false
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    case `${"LOGIN"}_FULFILLED`:
      return {...state, authLoading: false}
    case `${"LOGIN"}_PENDING`:
      return {...state, authLoading: true}
    case "LOGOUT":
    case `${"LOGIN"}_REJECTED`:
      return {...state, authLoading: false}
    default:
      return state;
  }
}


// thunk action creators
