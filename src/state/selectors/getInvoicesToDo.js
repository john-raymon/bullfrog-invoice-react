import { createSelector } from 'reselect'

export default createSelector(
  state => {
    return state.dashboard.invoicesToDo
  },
  invoicesToDo => {
    console.log('invoices to do look like', invoicesToDo)
    const invoices = invoicesToDo["records"].map((invoice, index) => {
      const { id: customerId, identifier: customerName } = invoice["field_570_raw"]
      return {
        date: invoice["field_405"],
        customer: {
          id: customerId,
          name: customerName
        }
      }
    })

    return {
      totalInvoicesToDo: invoices.length,
      invoices
    }
  }
);
