const initialState = {
  invoicesToDo: {},
  customers: {}
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
    default:
      return state;
  }
}
