const initialState = {
  authLoading: false,
  dashboard: {
    invoicesToDo: false
  }
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

    // status of dashboardActions
    case "FETCH_INVOICES_TO_DO_PENDING":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          invoicesToDo: true
        }
      }
    case "FETCH_INVOICES_TO_DO_FULFILLED":
    case "FETCH_INVOICES_TO_DO_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        invoicesToDo: false
      }
    }
    default:
      return state;
  }
}


// thunk action creators
