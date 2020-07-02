// handling the navigation between screen, like React Router in React.js
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Color';

import CategoryScreen from '../screens/CategoryScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';

// setting to make the default values for each screen, to not repeat the configuration each time
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};
// setting to make the default values for each screen, to not repeat the configuration each time

// defining the routes
const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoryScreen,
  } ,
  CategoryMeal: {
    screen: CategoryMealScreen,
  },
  MealDetail: MealDetailScreen
},
// defining the routes
  {
  // setting to make the default values for each screen, to not repeat the configuration each time
  defaultNavigationOptions: defaultStackNavOptions
  // setting to make the default values for each screen, to not repeat the configuration each time
  }
);

// favorites screen
const FavNavigator = createStackNavigator({
    Favorites: FavoriteScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
 });
// favorites screen

// personalize the tab navigation
const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-heart" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.secondaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};
// personalize the tab navigation

// adding tab navigator on the bottom
const MealsFavTabNavigator =
  Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true
  })
  : createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans'
    },
    activeTintColor: Colors.primaryColor
  }
});
// adding tab navigator on the bottom

// adding drawer navigation
const FiltersNavigator = createStackNavigator(
  {
    Filters: FilterScreen,
  },
  {
    // setting to make the default values for each screen, to not repeat the configuration each time
    defaultNavigationOptions: defaultStackNavOptions,
    // setting to make the default values for each screen, to not repeat the configuration each time
  }
);

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor,
    fontFamily: 'open-sans-bold'
  }
});
// adding drawer navigation

export default createAppContainer(MainNavigator);
