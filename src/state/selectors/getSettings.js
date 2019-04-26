import { createSelector } from 'reselect'

export default createSelector(
  (state) => state.globals.settings,
  ({ companyName, companyPhoneNumber, companyEmail, companyAddress, companyCityState, companyZip, companyOpeningStatement }) => {
    return {
      companyName,
      companyPhoneNumber,
      companyEmail,
      companyAddress,
      companyCityState,
      companyZip,
      companyOpeningStatement
    }
  }
)
