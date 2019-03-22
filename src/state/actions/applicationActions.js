import agent from '../../util/agent'

// Dashboard Actions
import { fetchInvoicesToDo } from './dashboardActions'

export function initApp() {
  return dispatch => {
    return dispatch({
      type: "INIT_APP",
      payload: new Promise((resolve, reject) => {

        // fetch all imporpant Data (dashboardActions, etc)
        const fetchAll = Promise.all([
          dispatch(fetchInvoicesToDo())
        ])

        const timeout = new Promise((resolve, reject) => {
          setTimeout(() => reject('Timeout'), 10000)
        })

        const checkTimeout = Promise.race([fetchAll, timeout])
        return checkTimeout
          .then(() => resolve())
          .catch(err => reject(err))
      })
    })
  }
}
