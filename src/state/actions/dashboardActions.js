import agent from '../../util/agent'

export function fetchInvoicesToDo() {
  return dispatch => {
    return dispatch({
      type: "FETCH_INVOICES_TO_DO",
      payload: agent.get('knack/invoices-to-do?rows_per_page=1000').then((res) => {
        // right now we're just maxing out and not accounting for if there is more
        // than 1 page, since we're expecting the Invoice-to-do Knack record to be
        // remove when saved as draft on our Backend
        return res;
      })
    })
  }
}
