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
      const { id: customerId, identifier: customerName } = invoice[`${process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_CUSTOMER_FIELD}_raw`][0]
      return {
        date: invoice[`${process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_DATE_FIELD}`],
        customer: {
          id: customerId,
          name: customerName
        }
      }
    })

    return invoices
  }
);
