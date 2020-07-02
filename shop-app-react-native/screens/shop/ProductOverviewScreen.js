import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';
// redux
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../redux/actions/product.action';

// redux

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../redux/actions/cart.action';
import Colors from '../../constants/ColorConstant';

// icons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
// icons

const ProductOverviewScreen = props => {
  // loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // loading spinner

  // pull to refresh
  const [isRefreshing, setIsRefreshing] = useState(false);
  // pull to refresh

  // handling error
  const[error, setError] = useState();
  // handling error

  // redux
  const products = useSelector(state => state.products.availableProducts);
  // redux

  // dispatch redux cart action
  const dispatch = useDispatch(); // passed to the onAddToCart props
  // dispatch redux cart action

  // loading spinner
  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true) // pull to refresh
    // setIsLoading(true); // removed after adding the pull refresh feature

    // handling errors
    try {
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      setError(error.message)
    }
    // handling errors
    // setIsLoading(false); // removed after adding the pull refresh feature
    setIsRefreshing(false) // pull to refresh
  }, [dispatch, setIsLoading, setError]);
  // loading spinner

  // changing the data and refetch the data directly from the firebase database
  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'focus',
      loadProducts
      );

    return () => {
      unsubscribe;
    };
  }, [loadProducts])
  // changing the data and refetch the data directly from the firebase database


  // http request from the firebase database
  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => { // added after adding the pull refresh feature
      setIsLoading(false)
    });
    // loading spinner
  }, [dispatch, loadProducts]);
  // http request from the firebase database

  // logic for the edit and delete button
  const selectItemHandler = (id, title) => {
    // set the navigation
    props.navigation.navigate("ProductDetail", {
      // pointing to the single product
      productId: id,
      productTitle: title,
      // pointing to the single product
    });
    // set the navigation
  }
  // logic for the edit and delete button

  // handling error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
      </View>
    )
  }
  // handling error

  // loading spinner
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe add some</Text>
      </View>
    )
  }
  // loading spinner

  return (
    <FlatList
    // pull to refresh
    onRefresh={loadProducts}
    refreshing={isRefreshing}
    // pull to refresh
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

// navigation v.4
// ProductOverviewScreen.navigationOptions; --> instead of "export const screenOptions"
// navigation v.4

export const screenOptions = navData => {
  return {
    // change the title on the header
    headerTitle: "All Products",
    // change the title on the header

    // drawer navigation
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          // icons
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          // icons
          onPress={() => {
            navData.navigation.toggleDrawer(); //with toggleDrawer we open the side bar
          }}
        />
      </HeaderButtons>
    ),
    // drawer navigation

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          // icons
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          // icons
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductOverviewScreen;
