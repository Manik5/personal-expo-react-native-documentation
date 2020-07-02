import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';

const MealList = props => {
  // favorite
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  // favorite
   // rendering the the objects from the Meal, and pass it into "renderItem"
  const renderMealItem = (itemData) => {
    // favorite
    const isFavorite = favoriteMeals.find(meal => meal.id === itemData.item.id);
    // favorite
    return (
    <MealItem
      title={itemData.item.title}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      image={itemData.item.imageUrl}
      onSelectMeal={() => {
        props.navigation.navigate({
          routeName: "MealDetail",
          params: {
            mealId: itemData.item.id,
            // sending the data in advance to the other screen
            mealTitle: itemData.item.title,
            // sending the data in advance to the other screen
            // favorite
            isFav: isFavorite
            // favorite
          }
        })
      }}
    />
    )
  }
  // rendering the objects from the Meal and pass it into "renderItem"
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
