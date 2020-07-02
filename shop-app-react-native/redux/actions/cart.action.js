export const ADD_TO_CART = 'ADD_TO_CART';
// delete an item from the cart
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// delete an item from the cart

export const addToCart = product => {
  return { type: ADD_TO_CART, product: product }
};

// delete an item from the cart
export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId }
}
// delete an item from the cart


