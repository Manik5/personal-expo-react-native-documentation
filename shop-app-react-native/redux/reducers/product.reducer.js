import PRODUCTS from '../../data/data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/product.action';
import Product from '../../models/ProductModel';

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, action) => {
	switch(action.type) {
		// http request from firebase database
		case SET_PRODUCTS:
			return {
				availableProducts: action.products,
				userProducts: action.userProducts
			};
		// http request from firebase database
		// creating an item
		case CREATE_PRODUCT:
			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct),
			}
			// creating an item

		// updating an item
		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(
				prod => prod.id === action.pid
		);
			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price,
			)

			const updatedUserProducts = [...state.userProducts];
			updatedUserProducts[productIndex] = updatedProduct;
			const availableProductIndex = state.userProducts.findIndex(
				prod => prod.id === action.pid
			);
			const updatedAvailableProducts = [...state.availableProducts];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;
			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts
			}
		// updating an item

		// deleting an item from the "UserProductScreen"
		case DELETE_PRODUCT:
			return {
        ...state,
        // keep all the products if the id match and if it' false it will not be included in the new array
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
         // keep all the products if the id match and if it' false it will not be included in the new array
        ),
      };
		}
	// deleting an item from the "UserProductScreen"

	return state;
}
