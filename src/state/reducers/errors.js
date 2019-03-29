const initialState = {
  dashboard: {
    invoicesToDo: null,
    customers: null
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
    case "FETCH_KNACK_CUSTOMERS_PENDING":
    case "FETCH_KNACK_CUSTOMERS_FULFILLED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        customers: null
      }
    }
    case "FETCH_KNACK_CUSTOMERS_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        customers: payload
      }
    }
    default:
      return state;
  }
}


// thunk action creators
