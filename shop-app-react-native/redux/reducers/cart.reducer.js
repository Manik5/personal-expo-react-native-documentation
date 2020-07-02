import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.action";
import CartItem from '../../models/CartItemModel';
import { ADD_ORDER } from "../actions/order.action";
import { DELETE_PRODUCT } from "../actions/product.action";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) { // already have the item in the cart
        // const updatedCartItem
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        // const newCarItem before "updatedOrNewCartItem"
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem }, // newCartItem instead of "updatedCartItem"
          // price
          totalAmount: state.totalAmount + prodPrice
          // price
        };
      // delete an item from the cart
      case REMOVE_FROM_CART:
        const selectedCartItem = state.items[action.pid]
        const currentQuantity = selectedCartItem.quantity;
        let updatedCartItems;
        if (currentQuantity > 1) { // reduce it
          const updatedCartItem = new CartItem(
            selectedCartItem.quantity - 1,
            selectedCartItem.productPrice,
            selectedCartItem.productTitle,
            selectedCartItem.sum - selectedCartItem.productPrice
          );
          updatedCartItems = { ...state.items, [action.pid]: updatedCartItem}
        } else { // delete it
          updatedCartItems = { ...state.items };
          delete updatedCartItems[action.pid]
        }
      // delete an item from the cart

      // adjusting the price
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
			// adjusting the price

			// clearing the cart
			case ADD_ORDER:
				return initialState;
			// clearing the cart
			// delete the product from the "UserProductScreen"
			case DELETE_PRODUCT:
				if (!state.items[action.pid]) {
					return state;
				}
				const updatedItems = { ...state.items};
				const itemTotal = state.items[action.pid].sum;
				delete updatedItems[action.pid];
				return {
					...state,
					items: updatedItems,
					totalAmount: state.totalAmount - itemTotal
				}
    }
    return state;
  };

  // instead of using this, defined "let updatedOrNewCarItem, to keep it dry"
  // return {
  //   ...state,
  //   items: { ...state.items, [addedProduct.id]: updatedCartItem },
  //   // price
  //   totalAmount: state.totalAmount + prodPrice
  //   // price
  // }
