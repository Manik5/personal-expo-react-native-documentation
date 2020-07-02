import Order from '../../models/OrderModel';

export  const ADD_ORDER = 'ADD_ORDER';

// fetching orders from the database
export const SET_ORDERS = 'SET_ORDERS'
// fetching orders from the database

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    // mapping orders to users
    const userId = getState().auth.userId
    // mapping orders to users

    try {
      // firebase
      const response = await fetch(
        `https://shop-app-react-native-7334c.firebaseio.com/orders/${userId}.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key.totalAmount],
            new Date(responseData[key].date)
          )
        )
      }
    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders
    })
    } catch (error) {
      throw error
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  // redux thunk
  return async (dispatch, getState) => {

    const token = getState().auth.token;
    // mapping orders to users
    const userId = getState().auth.userId;
    // mapping orders to users

    // storing orders

    const date = new Date();

    // firebase
    const response = await fetch(
      `https://shop-app-react-native-7334c.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
        // firebase
      });

      if (!response.ok) {
        throw new Error('Something went wrong')
      }
    // redux thunk
    const responseData = await response.json();
    // storing orders

    // firebase
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    })
  }
  // redux thunk
}
