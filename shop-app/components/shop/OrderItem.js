import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';

import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/ColorConstant';
import Card from '../UI/Card';

const OrderItem = props => {
  // make the "show details button rendering all the items we have"
  const [showDetails, setShowDetails] = useState(false);
  // make the "show details button rendering all the items we have"

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : "Show Details"}
        // make the "show details button rendering all the items we have"
        onPress={() => {
          setShowDetails(prevState => !prevState)
        }}
        />
        {
          showDetails &&
            <View style={styles.detailItems}>
              {props.items.map(
                cartItem =>
                  <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    title={cartItem.productTitle}
                    amount={cartItem.sum}
                  />
                )
              }
            </View>
        }
        {/* // make the "show details button rendering all the items we have" */}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;
