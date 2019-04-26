const initialState = {
  authLoading: false,
  dashboard: {
    invoicesToDo: false,
    customers: false,
    allInvoices: false
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
    case "FETCH_ALL_INVOICES_PENDING":
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          allInvoices: true
        }
      }
    case "FETCH_ALL_INVOICES_FULFILLED":
    case "FETCH_ALL_INVOICES_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        allInvoices: false
      }
    }
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
    case "FETCH_KNACK_CUSTOMERS_PENDING":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        customers: true
      }
    }
    case "FETCH_KNACK_CUSTOMERS_FULFILLED":
    case "FETCH_KNACK_CUSTOMERS_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        customers: false
      }
    }
    default:
      return state;
  }
}


// thunk action creators
