import agent from '../../util/agent'

// Dashboard Actions
import { fetchInvoicesToDo, fetchAllInvoices } from './dashboardActions'

export function initApp() {
  return dispatch => {
    return dispatch({
      type: "INIT_APP",
      payload: new Promise((resolve, reject) => {

        // fetch all imporpant Data (dashboardActions, etc)
        const fetchAll = Promise.all([
          dispatch(fetchInvoicesToDo()),
          dispatch(fetchAllInvoices()),
          dispatch(fetchSettings())
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

export function fetchSettings() {
  return dispatch => {
    return dispatch({
      type: "FETCH_SETTINGS",
      payload: agent.requests.get('settings')
        .then(res => {
          if (res.status === 401) {
            dispatch({ type: "LOGOUT" })
            return Promise.reject()
          }
          return res
        }).catch(err => {
          if (err.status === 401) {
            dispatch({ type: "LOGOUT" })
          }
          return Promise.reject(err)
        })
    })
  }
}
