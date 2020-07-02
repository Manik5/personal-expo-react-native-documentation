import React, {useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons' // setting up to add meal to favorites

// redux
import { useSelector, useDispatch } from 'react-redux';
// redux

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import ListItem from '../components/ListItem';

// redux
import { toggleFavorite } from '../redux/actions/meals.action';
// redux


const MealDetailScreen = props => {
  // redux
  const availableMeals = useSelector(state => state.meals.meals);
  // redux

  const mealId = props.navigation.getParam('mealId')

  // change the color of the heart, based if the meal is toggle as favorite
  const currentFavoriteMeals = useSelector(
    state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  // change the color of the heart, based if the meal is toggle as favorite


  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId])

  // params is used to communicate between components
  useEffect(() => {
    // props.navigation.setParams({mealTitle: selectedMeal.title});
    props.navigation.setParams({toggleFav: toggleFavoriteHandler})
  }, [toggleFavoriteHandler])
  // params is used to communicate between components

  // change the color of the heart, based if the meal is toggle as favorite
  useEffect(() => {
    props.navigation.setParams({ isFav: currentFavoriteMeals })
  }, [currentFavoriteMeals])
  // change the color of the heart, based if the meal is toggle as favorite


  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(
          ingredient =>
            <ListItem key={ingredient}>
              {ingredient}
            </ListItem>
           )}
      <Text style={styles.title}>Steps</Text>
         {selectedMeal.steps.map(
           step =>
            <ListItem key={step}>
              {step}
            </ListItem>
          )}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam('mealId')
  // const selectedMeal = MEALS.find(meal => meal.id === mealId)

  // retrieving this data from the useEffect of the toggleFavorite function
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  // retrieving this data from the useEffect above of the toggleFavorite function
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');

  // retrieving data from the useEffect of the currentFavoriteMeals function
  const isFavorite = navigationData.navigation.getParam('isFav');
  // retrieving data from the useEffect of the currentFavoriteMeals function


  return {
    headerTitle: mealTitle,
    // setting up to add meal to favorites
    headerRight: () =>
      <HeaderButtons
        HeaderButtonComponent={HeaderButton}
      >
        <Item
          title='Favorite'
          iconName={isFavorite ? 'ios-heart' : 'ios-heart-empty' }
          onPress={toggleFavorite}
          />
      </HeaderButtons>
    // setting up to add meal to favorites
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default MealDetailScreen;
