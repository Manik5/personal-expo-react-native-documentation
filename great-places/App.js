import React from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';

import { init } from './helpers/db';

// redux
import placesReducer from './redux/reducer/places.reducer';
// redux

init()
	.then(() => {
	console.log('Initialized database')
})
.catch(error => {
	console.log('Initializing db failed.');
	console.log(error);
})

// redux
const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// redux

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

