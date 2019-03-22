import agent from '../../util/agent'

// Dashboard Actions
import { fetchInvoicesToDo as fetchDashboardInvoicesToDo } from './dashboardActions'

export function initApp() {
  return dispatch => {
    return dispatch({
      type: "INIT_APP",
      payload: new Promise((resolve, reject) => {


        // fetch all imporpant Data (dashboardActions, etc)
        const fetchAll = Promise.all([
          dispatch(fetchInvoicesToDo())
        ])

      })
    })
  }
}
