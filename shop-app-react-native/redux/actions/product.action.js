import Product from '../../models/ProductModel';

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
// creating a item
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
// creating a item

// updating an item
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
// updating an item

// http request from firebase database
export const SET_PRODUCTS = 'SET_PRODUCTS'
// http request from firebase database

// http request from firebase database
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code will work
    // handling errors

    const userId = getState().auth.userId;

    try {
      // firebase
      const response = await fetch(
        'https://shop-app-react-native-7334c.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const responseData = await response.json();
      const loadedProducts = [];

        for (const key in responseData) {
          loadedProducts.push(
            new Product(
              key,
              responseData[key].ownerId,
              responseData[key].title,
              responseData[key].imageUrl,
              responseData[key].description,
              responseData[key].price
          ))
        }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (error) {
      throw error;
    }
    // handling errors
  }
}

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    // firebase

    const token = getState().auth.token;

    const response = await fetch(
      // with backtick we point to a single dynamic data
      `https://shop-app-react-native-7334c.firebaseio.com/products/${productId}.json?auth=${token}`,
      // with backtick we point to a single dynamic data
      {
        method: 'DELETE',
        // firebase
      });

    // error message to display in the EditProductScreen
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    // error message to display in the EditProductScreen

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    })
  }
}
// http request from firebase database



// creating a item
export const createProduct = (title, description, imageUrl, price) => {
  // redux thunk
  return async (dispatch, getState) => {
    // any async code will work

    const token = getState().auth.token;
    const userId = getState().auth.userId

    // firebase
    const response = await fetch(
      `https://shop-app-react-native-7334c.firebaseio.com/products.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
      // firebase
    });
    // redux thunk

    const responseData = await response.json();
    // firebase

    dispatch({
      // redux thunk
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    })
  }
}
// creating an item

// updating an item
export const updateProduct = (id, title, description, imageUrl) => {
  // updating product from firebase database
  return async (dispatch, getState) => {
    // getting the token
    const token = getState().auth.token;
    // getting the token

    // firebase
    const response = await fetch(
      // with backtick we point to a single dynamic data
      `https://shop-app-react-native-7334c.firebaseio.com/products/${id}.json?auth=${token}`,
      // with backtick we point to a single dynamic data
      {
        // PATCH, update the specific id
        method: 'PATCH',
        // PATCH, update the specific id
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        })
        // firebase
      });

      // error message to display in the EditProductScreen
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      // error message to display in the EditProductScreen

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  }
  // updating product from firebase database
}
// updating an item
