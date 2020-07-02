import React from 'react';
import {
	FlatList,
	Platform,
	Button,
	Alert,
	View,
	Text
} from 'react-native';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../redux/actions/product.action';
// redux

// icons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
// icons

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/ColorConstant';

const UserProductsScreen = props => {
  // redux
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch();
  // redux

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {productId: id})
  }

  // alert
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'yes', style: 'destructive', onPress: () => {
          dispatch(productsActions.deleteProduct(id))
        }  }
    ]);
  };
	// alert

	// mapping orders to the users
	if ( userProducts.length === 0 ) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>No products found, maybe start creating some? </Text>
			</View>
		)
	}
	// mapping orders to the users


  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

// UserProductsScreen.navigationOptions --> nav v.4

 export const screenOptions= navData => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          // icons
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          // icons
          onPress={() => {
            navData.navigation.navigate('EditProduct'); //with toggleDrawer we open the side bar
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
