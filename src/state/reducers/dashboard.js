const initialState = {
  invoicesToDo: {},
  customers: {},
  allInvoices: []
}

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case "FETCH_INVOICES_TO_DO_FULFILLED":
      return {
        ...state,
        invoicesToDo: payload
      }
    case "FETCH_KNACK_CUSTOMERS_FULFILLED":
      return {
        ...state,
        customers: payload
      }
    case "FETCH_ALL_INVOICES_FULFILLED":
      return {
        ...state,
        allInvoices:  payload
      }
    default:
      return state;
  }
}
