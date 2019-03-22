const initialState = {
  dashboard: {
    invoicesToDo: null
  }
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    case "FETCH_INVOICES_TO_DO_PENDING":
    case "FETCH_INVOICES_TO_DO_FULFILLED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        invoicesToDo: null
      }
    }
    case "FETCH_INVOICES_TO_DO_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        invoicesToDo: payload
      }
    }
    default:
      return state;
  }
}


// thunk action creators
