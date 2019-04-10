import { createSelector } from 'reselect'
import _get from 'lodash/get';

export default createSelector(
  state => {
    console.log('the state inside the selector getCustomerSearchResults is', state)
    return state.dashboard.customers
  },
  customers => {
    const records = _get(customers, "records", []).map((customer, index) => {
      const { id:customerId, field_15:customerName } = customer
      return {
          id: customerId,
          customerName
        }
    })

    return records
  }
);