import React from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// importing the hard coded seed data
import { CATEGORIES } from '../data/category.data';
// importing the hard coded seed data

import CategoryGrid from '../components/CategoryGrid';
import HeaderButton from '../components/HeaderButton';

const CategoryScreen = props => {
  // function to render the data, connecting to "renderItem"
  const renderGridItem = (itemData) => {
  // function to render the data, connecting to "renderItem"
    return (
      <CategoryGrid
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
            props.navigation.navigate({
              routeName: "CategoryMeal",
              params: {
                categoryId: itemData.item.id, // passing the id of the data in the CategoryMealScreen
              },
            });
        }}
        />
    )
  };
  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2} />
  );
};

// changing the title of the current screen
CategoryScreen.navigationOptions = navData => {
  return {
      headerTitle: 'Meal Categories',
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
// changing the title of the current screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CategoryScreen;

{/* <Button title="Go to Category" onPress={() =>{
  props.navigation.navigate({routeName: 'CategoryMeal'}) // defining the route
}} /> */}
