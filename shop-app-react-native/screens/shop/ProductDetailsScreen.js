import React from 'react';
import { Text, View, StyleSheet, Image, Button, ScrollView } from 'react-native';

import Colors from '../../constants/ColorConstant';

// redux
import { useSelector, useDispatch } from 'react-redux';
// redux

import * as cartActions from '../../redux/actions/cart.action';

const ProductDetailsScreen = props => {
  // extracting that specified product
  const productId = props.route.params.productId
  // extracting that specified product

  // fetching from redux the single product
  const selectedProduct = useSelector(
    state => state.products.availableProducts.find(
      product => product.id === productId)
    )
  // fetching from redux the single product

  // dispatch redux cart action
  const dispatch = useDispatch(); // passed to the onPress Button
  // dispatch redux cart action

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{uri: selectedProduct.imageUrl}} />
        <View style={styles.action}>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct))
            }} />
        </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
};

// functional form to extract in a dynamic way from the route params the title
// ProductDetailsScreen.navigationOptions --> nav v.4
 export const screenOptions = navData => {
  return {
		// headerTitle: navData.navigation.getParam('productTitle')
		headerTitle: navData.route.params.productTitle
  }
}
// functional form to extract in a dynamic way from the route params the title

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  action: {
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 20
  },
  price: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  }
});

export default ProductDetailsScreen;
