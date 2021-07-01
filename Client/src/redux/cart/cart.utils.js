export const addItemToCart = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToAdd._id &&
      cartItem.option === cartItemToAdd.option
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id &&
      cartItem.option === cartItemToAdd.option
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToRemove._id &&
      cartItem.option === cartItemToRemove.option
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) =>
        (cartItem._id !== cartItemToRemove._id &&
          cartItem.option !== cartItemToRemove.option) ||
        (cartItem._id === cartItemToRemove._id &&
          cartItem.option !== cartItemToRemove.option) ||
        (cartItem._id !== cartItemToRemove._id &&
          cartItem.option === cartItemToRemove.option)
    );
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id &&
    cartItem.option === cartItemToRemove.option
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
