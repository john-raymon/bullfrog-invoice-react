const initialState = {
  dashboard: {
    invoicesToDo: null,
    customers: null,
    allInvoices: null
  },
  settings: null
}

export default (state = initialState, { type, payload = {} } ) => {
  switch (type) {
    // FETCH SETTINGS ERRORS
    case "FETCH_SETTINGS_PENDING":
    case "FETCH_SETTINGS_FULFILLED":
    return {
      ...state,
      settings: null
    }
    case "FETCH_SETTINGS_REJECTED":
    return {
      ...state,
      settings: payload
    }

    // FETCH ALL INVOICES ERRORS
    case "FETCH_ALL_INVOICES_PENDING":
    case "FETCH_ALL_INVOICES_FULFILLED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        allInvoices: null
      }
    }
    case "FETCH_ALL_INVOICES_REJECTED":
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        allInvoices: payload
      }
    }

    // FETCH INVOICES TO DO ERRORS
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

    // FETCH KNACK CUSTOMERS ERRORS
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
