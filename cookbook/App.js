import React, {useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; // determine the Loading state of the App by loading the font or not
import MealsNavigator from './navigation/MealsNavigation';

// importing Redux
import { createStore, combineReducers } from 'redux';
import mealsReducer from './redux/reducer/meals';
import { Provider } from 'react-redux';
// importing Redux

// make it more performant with this package
import { enableScreens } from 'react-native-screens';
enableScreens();
// make it more performant with this package

// redux
const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer)
// redux


// function to fetch the Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
// function to fetch the Fonts


export default function App() {
  // hooks to determine the fonts
  const [fontLoaded, setFontLoaded] = useState(false); // false is the initial state
  // hooks to determine the fonts

  // function to make the screen loaded until the the fonts are not charged
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={error => console.log(error)}
      />
    )
  }
  // function to make the screen loaded until the the fonts are not charged

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

