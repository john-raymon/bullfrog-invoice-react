import { createSelector } from 'reselect'

export default createSelector(
  state => auth.isAuth,
  isAuth => isAuth
);
