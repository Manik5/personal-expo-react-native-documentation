import React, { useState } from 'react';
// loading fonts
import * as Font from 'expo-font';
// loading fonts

// for debugging with the react native tools
// import { composeWithDevTools } from 'redux-devtools-extension';
// for debugging with the react native tools

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './redux/reducers/cart.reducer';
import productsReducer from './redux/reducers/product.reducer';
import ordersReducer from './redux/reducers/order.reducer';
import ReduxThunk from 'redux-thunk';
// redux

// using the token for the user login/signup
import authReducer from './redux/reducers/auth.reducer';
// using the token for the user login/signup

// import ShopNavigator from './navigation/ShopNavigator';

// auto logout when token expires
import AppNavigator from './navigation/AppNavigator';
// auto logout when token expires

import { AppLoading } from 'expo';

// redux
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
	orders: ordersReducer,
	auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)) //composeWithDevTools()); // remove composeWithDevTools before DEPLOYING IN PRODUCTION!
// redux

// fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
// fonts

export default function App() {
  // fonts
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={error => console.log(error)}
      />
    )
  }
  // fonts
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
