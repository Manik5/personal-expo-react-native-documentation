import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
  // ripple effect
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  // ripple effect
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent
          onPress={props.onSelect}
          useForeground
          >
            <View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: props.image}}
                  />
              </View>
                <View style={styles.details}>
                  <Text style={styles.title}>{props.title}</Text>
                  <Text style={styles.price}></Text>
                </View>
              <View style={styles.action}>
                {props.children}
              </View>
            </View>
        </TouchableComponent>
      </View>
     </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 20
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  },
});

export default ProductItem;


// moved to the ProductOverviewScreen after adding the UserProductScreen logic
{/* <Button
  color={Colors.primary}
  title="View Details"
  onPress={props.onViewDetail}
  />
<Button
  color={Colors.primary}
  title="Add to Cart"
  onPress={props.onAddToCart}
/>  */}
// moved to the ProductOverviewScreen after adding the UserProductScreen logic
