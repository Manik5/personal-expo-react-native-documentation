import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

// fetching the location
import * as Location from 'expo-location';
//fetching the location

import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors.constant';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  // storing the picked location
  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  // updating the location screen when the location changes
  const {onLocationPicked} = props;
  // updating the location screen when the location changes

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
       // updating the location screen when the location changes
      props.onLocationPicked(mapPickedLocation);
      // updating the location screen when the location changes
    }
  }, [mapPickedLocation, onLocationPicked])
  // storing the picked location

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      // updating the location screen when the location changes
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      // updating the location screen when the location changes
    } catch (error) {
      Alert.alert(
        'Location not found',
        'Please try again later or pick another location on the map.',
        [{ text: 'Okay' }]
       )
    }
    setIsFetching(false);
  };

  // displaying a dynamic map
  const pickMapHandler = () => {
    props.navigation.navigate('Map');
  }
  // displaying a dynamic map

  // verifying permission for camera in IOS
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.LOCATION
     );

    if (result.status !== 'granted') {
      Alert.alert(
        'You have no permissions',
        [{ text: 'Okay' }]
        );
       return false;
    }
    return true;
  }
  // verifying permission for camera in IOS

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
         location={pickedLocation}
         onPress={pickMapHandler}
       >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
