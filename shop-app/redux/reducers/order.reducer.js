import { ADD_ORDER, SET_ORDERS } from "../actions/order.action";
import Order from "../../models/OrderModel";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch(action.type) {
		// fetching orders from firebase
		case SET_ORDERS:
			return {
				orders: action.orders
			}
		// fetching orders from firebase
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
				action.orderData.amount,
				// storing orders
				action.orderData.id,
				action.orderData.date,
				// storing orders
        new Date()
    );
    return {
      ...state,
      // adding a new item into an array and returning a new array with the new item
      orders: state.orders.concat(newOrder)
      // adding a new item into an array and returning a new array with the new item
    }
  }
  return state;
}
