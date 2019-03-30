import { createSelector } from 'reselect'
import _get from 'lodash/get';

export default createSelector(
  state => {
    console.log('the state inside the selector is', state)
    return state.dashboard.invoicesToDo
  },
  invoicesToDo => {
    console.log('invoices to do look like', invoicesToDo)
    const invoices = _get(invoicesToDo, "records", []).map((invoice, index) => {
      const { id: customerId, identifier: customerName } = invoice["field_570_raw"][0]
      return {
        date: invoice["field_405"],
        customer: {
          id: customerId,
          name: customerName
        }
      }
    })

    return invoices
  }
);
