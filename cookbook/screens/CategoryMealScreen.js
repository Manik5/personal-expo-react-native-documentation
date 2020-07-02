import React from 'react';
// redux
import { useSelector } from 'react-redux';
// redux

import { CATEGORIES, MEALS } from '../data/category.data';

import { View, StyleSheet } from 'react-native';

import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {

  // getting the id from the CategoryScreen
  const catId = props.navigation.getParam('categoryId')
  // getting the id from the CategoryScreen

  // redux
  const availableMeals = useSelector(state => state.meals.filteredMeals)
  // redux

  // displaying the data from the MEALS data based on the CATEGORY
  const displayMeal = availableMeals.filter(
      meal => meal.categoryIds.indexOf(catId) >= 0
    );
  // displaying the data from the MEALS data based on the CATEGORY

  // fallback for the filter function
    if (displayMeal.length === 0) {
      return (
        <View style={styles.content}>
          <DefaultText>No meals found, check your filters!</DefaultText>
        </View>
      )
    }
  // fallback for the filter function

  return (
    <MealList
      listData={displayMeal}
      navigation={props.navigation}
    />
  )
};

// render the title of categoryId in the header
CategoryMealScreen.navigationOptions = navigationData =>  {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === catId)

  return {
    headerTitle: selectedCategory.title,
  };
};
// render the title of categoryId in the header

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryMealScreen;


