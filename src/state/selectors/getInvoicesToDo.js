import { createSelector } from 'reselect'
import _get from 'lodash/get';

export default createSelector(
  state => {
    console.log('the state inside the selector is', state)
    return state.dashboard.invoicesToDo
  },
  invoicesToDo => {
    const tester1 = process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_CUSTOMER_FIELD, tester2 = process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_DATE_FIELD
    const invoices = _get(invoicesToDo, "records", []).map((invoice, index) => {
      const { id: customerId, identifier: customerName } = (Array.isArray(invoice[`${process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_CUSTOMER_FIELD}_raw`]) && invoice[`${process.env.REACT_APP_KNACK_INVOICE_TO_DO_LIST_CUSTOMER_FIELD}_raw`][0]) || { id: '', identifier: ''}
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
