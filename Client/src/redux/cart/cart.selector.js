import { createSelector } from "reselect";

// input selector (passed to o/p selector)
// ? an i/p selector is a fxn that takes state and returns a slice of it
const selectCart = (state) => state.cart;

//o/p selector (takes array of i/p selectors in order, returns the desired slice of state from i/p selectors)

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, el) => acc + el.quantity, 0)
);

export const selectCartItemsPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((acc, el) => acc + el.quantity*el.price, 0)
  );

export const selectHidden = createSelector(selectCart, (cart) => cart.hidden);
