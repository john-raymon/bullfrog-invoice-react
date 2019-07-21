import agent from '../../util/agent'
import { fetchAllInvoices } from './dashboardActions'

export const deleteDraftInvoice = invoiceUUID => (dispatch, getState) => {
  agent.setToken(getState().auth.token)

  return dispatch({
    type: "DELETE_DRAFT_INVOICE",
    payload: agent.requests.post(`invoices/${invoiceUUID}/delete-draft`).then((res) => {
      if (res.success) {
        dispatch(fetchAllInvoices())
      }
      return res;
    })
  })
}
