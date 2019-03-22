const initialState = {
  invoicesToDo: {}
}

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case "FETCH_INVOICES_TO_DO_FULFILLED":
      return {
        ...state,
        invoicesToDo: payload
      }
    default:
      return state;
  }
}
