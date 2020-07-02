import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import ToggleSwitch from '../components/ToggleSwitch';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/actions/meals.action';

const FilterScreen = props => {
  const { navigation } = props;
  // managing the state of the "Switch" component with Hooks
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
	// managing the state of the "Switch" component with Hooks

	// filter function
	const dispatch = useDispatch();
	// filter function

  // managing to save the filters
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

		// filter function
		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])
	// filter function

  useEffect(() => {
    navigation.setParams({save: saveFilters});
  }, [saveFilters]);
  // managing to save the filters


  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters</Text>
        <ToggleSwitch
          label='Gluten Free'
          state={isGlutenFree}
          onChange={newValue => setIsGlutenFree(newValue)}
        />
        <ToggleSwitch
          label='Lactose Free'
          state={isLactoseFree}
          onChange={newValue => setIsLactoseFree(newValue)}
        />
        <ToggleSwitch
          label='Vegan'
          state={isVegan}
          onChange={newValue => setIsVegan(newValue)}
        />
        <ToggleSwitch
          label='Vegetarian'
          state={isVegetarian}
          onChange={newValue => setIsVegetarian(newValue)}
        />
    </View>
  )
};

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filter Meals",
    // adding the drawer navigation icon
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // adding the drawer navigation icon

    // managing to save the filters
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
    // managing to save the filters
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    margin: 18,
    textAlign: 'center'
  }
});

export default FilterScreen;
