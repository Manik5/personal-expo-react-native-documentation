import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';

// navigation screen
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlaceListScreen from '../screens/PlaceListScreen';
// navigation screen

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors.constant';


const PlacesNavigator = createStackNavigator({
  Places: PlaceListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default createAppContainer(PlacesNavigator);
