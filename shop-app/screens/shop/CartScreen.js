import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../redux/actions/cart.action';
import * as orderActions from '../../redux/actions/order.action';
// redux

import Colors from '../../constants/ColorConstant';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false)

  // redux
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  // redux for the items
  const cartItems = useSelector(state => {
    // returning an array
    const transformedCartItems = [];
    // looping through all the elements in the objects
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    // looping through all the elements in the objects
    // sorting it to get the items in order
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    // sorting it to get the items in order
    // returning an array
  });
  // redux for the items
  // redux

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
    setIsLoading(false);
  }


  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            color={Colors.secondary}
            title="Order Now"
            disabled={cartItems.length === 0}
            // order reducer
            onPress={sendOrderHandler}
          // order reducer
          />
        )}
      </Card>
      {/* displaying the data from the CartItem */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData =>
          <CartItem
          quantity={itemData.item.quantity}
          title={itemData.item.productTitle}
          amount={itemData.item.sum}
          deletable
          // delete an item from the cart
          onRemove={() => {
            dispatch(cartActions.removeFromCart(itemData.item.productId))
          }}
          // delete an item from the cart
          />
        }
      />
      {/* displaying the data from the CartItem */}

    </View>
  )
};

// CartScreen.navigationOptions --> nav v.4
export const screenOptions  = {
  headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
});

export default CartScreen;
