import React from 'react';

// navigation v.5
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
// navigation v.5

import { Platform, SafeAreaView, Button, View } from 'react-native';

// navigation screens
import ProductOverviewScreen, { screenOptions as productOverviewScreen } from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailsScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrderScreen, { screenOptions as orderScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductScreen, { screenOptions as userProductScreenOptions} from '../screens/user/UserProductScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions} from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import StartScreen from '../screens/StartScreen';
// navigation screens

import Colors from '../constants/ColorConstant';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/auth.action';


const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white'  : Colors.primary
  };

  // navigation v.5
  const ProductsStackNavigator = createStackNavigator();

  export const ProductsNavigator = () => {
    return (
      <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen
          name="ProductOverview"
          component={ProductOverviewScreen}
          options={productOverviewScreen}
        />
        <ProductsStackNavigator.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={productDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen
          name="Cart"
          component={CartScreen}
          options={cartScreenOptions}
        />
      </ProductsStackNavigator.Navigator>
    );
  }
  // navigation v.5

  // navigation v.5
  const OrdersStackNavigator = createStackNavigator();

  export const OrdersNavigator = () => {
    return (
      <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen
          name="Orders"
          component={OrderScreen}
          options={orderScreenOptions}
        />
      </OrdersStackNavigator.Navigator>
    )
  }
  // navigation v.5

  // navigation v. 5
  const AdminStackNavigator = createStackNavigator();

  export const AdminNavigator = () => {
    return (
      <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen
          name="UserProduct"
          component={UserProductScreen}
          options={userProductScreenOptions}
        />
        <AdminStackNavigator.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={editProductScreenOptions}
        />
      </AdminStackNavigator.Navigator>
    )
  };
  // navigation v. 5

  export const ShopDrawerNavigator = createDrawerNavigator();

  export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
      <ShopDrawerNavigator.Navigator
        drawerContent={props => {
          return (
            <View style={{ flex: 1, padding: 20 }}>
              <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItemList {...props} />
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate('Auth')
                  }}
                />
              </SafeAreaView>
            </View>
          )
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary
        }}
        >
        <ShopDrawerNavigator.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
      </ShopDrawerNavigator.Navigator>
    )
  };

  const AuthStackNavigator = createStackNavigator();

  export const AuthNavigator = () => {
    return (
      <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen
          name="Auth"
          component={AuthScreen}
          options={authScreenOptions}
        />
      </AuthStackNavigator.Navigator>
    )
  }



//  navigation v.4

// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductOverview: ProductOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     // adding icons to the drawer navigations
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     // adding icons to the drawer navigations
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// const OrdersNavigator = createStackNavigator(
//   {
//     Order: OrderScreen,
//   },
//   {
//     // adding icons to the drawer navigations
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     // adding icons to the drawer navigations

//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// adding a product
// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductScreen,
//     EditProduct: EditProductScreen
//   },
//   {
//     // adding icons to the drawer navigations
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     // adding icons to the drawer navigations

//     defaultNavigationOptions: defaultNavOptions,
//   }
// );
// adding a product

// drawer navigation
// const ShopNavigator = createDrawerNavigator({
//   Products: ProductsNavigator,
//   Orders: OrdersNavigator,
//   Admin: AdminNavigator
// }, {
//   contentOptions: {
//     activeTintColor: Colors.primary
//   },
//   // logout logic
//   contentComponent: props => {
//     const dispatch = useDispatch();
//     return (
//       <View style={{ flex: 1, padding: 20 }}>
//         <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//           <DrawerNavigatorItems {...props} />
//           <Button
//             title="Logout"
//             color={Colors.primary}
//             onPress={() => {
//               dispatch(authActions.logout());
//               // props.navigation.navigate('Auth')
//             }}
//           />
//         </SafeAreaView>
//       </View>
//     )
//   }
//   // logout logic
// })
// drawer navigation

// switch navigator for the user input

// const AuthNavigator = createStackNavigator({
//   Auth: AuthScreen
// }, {
//   defaultNavigationOptions: defaultNavOptions
// })

// const MainNavigator = createSwitchNavigator({
//   Start: StartScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// })
// // switch navigator for the user input


// export default createAppContainer(MainNavigator);



// navigation v.4
