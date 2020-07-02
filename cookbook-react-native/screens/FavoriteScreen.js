import React from 'react';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native';

// redux
import { useSelector } from 'react-redux';
// redux

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';

const FavoriteScreen = props => {
  // redux
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  // redux

  // fallback if the screen is empty
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>Add some of your favorites meals!</DefaultText>
      </View>
    )
  }
  // fallback if the screen is empty

  return (
    <MealList
      listData={favMeals}
      navigation={props.navigation}
      />
  )
};

// setting up the navigation for the favorite screen
FavoriteScreen.navigationOptions = navData => {
  return  {
    headerTitle: 'Your Favorite Meals',
    // adding the drawer navigation icon
      headerLeft: () =>
        <HeaderButtons
          HeaderButtonComponent={HeaderButton}
          >
          <Item
            title="Menu"
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      // adding the drawer navigation icon
  }
}
// setting up the navigation for the favorite screen

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoriteScreen;
