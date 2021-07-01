import { createSelector } from "reselect";
// create an input selector to retrieve the user state
export const selectUser = (state) => state.user;

//create an o/p selector and then return the user current user
export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.currentUser
);
