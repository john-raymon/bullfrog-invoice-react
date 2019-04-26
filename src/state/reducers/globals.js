const initialState = {
  settings: {}
}

export default (state = initialState, { type, payload = {} }) => {
 switch(type) {
   case 'FETCH_SETTINGS_FULFILLED':
    return {
      ...state,
      settings: payload.settings
    }
    default:
      return state
  }
}
