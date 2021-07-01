import { createSelector } from "reselect";
// create an input selector to retrieve the user state
export const selectOrder = (state) => state.order;
export const selectOrderAddress = createSelector(
  [selectOrder],
  (order) => order.orderAddress
);
export const selectPlaceingStatus = createSelector(
  [selectOrder],
  (order) => order.orderPlacing
);
export const selectPlaceingError = createSelector(
  [selectOrder],
  (order) => order.errorPlacing
);
export const selectOrderList = createSelector(
  [selectOrder],
  (order) => order.orderList
);
export const selectOrderByIdList = createSelector(
  [selectOrder],
  (order) => order.orderByIdList
);
