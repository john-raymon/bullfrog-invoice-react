import { createSelector } from 'reselect'
import _get from 'lodash/get';

export default createSelector(
  state => {
    console.log('the state inside the selector is', state)
    return state.dashboard.allInvoices
  },
  allInvoices => {
    const invoices = allInvoices.map((invoice, index) => {
      const { draft: isDraft, id: invoiceUUID, invoiceName } = invoice
      return {
        isDraft,
        invoiceUUID,
        invoiceName
      }
    })

    return invoices
  }
);
