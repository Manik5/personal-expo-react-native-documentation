import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	Platform,
	ActivityIndicator,
	View,
	Text
} from 'react-native';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as orderActions from '../../redux/actions/order.action';
// redux

// icons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
// icons

import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/ColorConstant';

const OrderScreen = props => {
  // redux,     the state is fetching the orders from App.js and then from order.reducer
  const orders = useSelector(state => state.orders.orders);
  // redux

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
	}

	// mapping orders to the users
	if (orders.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>No orders found</Text>
			</View>
		)
	}
	// mapping orders to the users

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      }
    />
  )
};
// OrderScreen.navigationOptions --> nav v.4
export const screenOptions = navData => {
  return {
    headerTitle: "Your Orders",
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
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OrderScreen;
