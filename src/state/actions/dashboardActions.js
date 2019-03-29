import agent from '../../util/agent'

export function fetchInvoicesToDo() {
  return (dispatch, getState) => {
    const { token } = getState().auth
    agent.setToken(token)
    console.log('this is the current agent')
    return dispatch({
      type: "FETCH_INVOICES_TO_DO",
      payload: agent.requests.get('knack/invoices-to-do?rows_per_page=1000&sort_field=field_405&sort_order=asc').then((res) => {
        // right now we're just maxing out and not accounting for if there is more
        // than 1 page, since we're expecting the Invoice-to-do Knack record to be
        // remove when saved as draft on our Backend

        console.log('this is the res status!!!', res)
        if (res.status === 401) {
          dispatch({ type: "LOGOUT" })
          return Promise.reject()
        }

        return res;
      }).catch((err) => {
        if (err.status === 401) {
          dispatch({ type: "LOGOUT" })
        }
        return Promise.reject(err)
      })
    })
  }
}

export function fetchKnackCustomers(searchQuery) {
  return (dispatch) => {
    return dispatch({
      type: "FETCH_KNACK_CUSTOMERS",
      payload: agent.requests.get(`knack/search-customers?searchFor=${encodeURIComponent(searchQuery)}`)
        .then(res => {
          if (res.status === 401) {
            dispatch({ type: "LOGOUT" })
            return Promise.reject()
          }
          return res
        }).catch(err => {
          // if (err.status === 401) {
          //   dispatch({ type: "LOGOUT" })
          // }
          return Promise.reject(err)
        })
    })
  }
}
