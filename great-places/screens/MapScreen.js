import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";

import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors.constant';

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  // mark the place
  const [selectedLocation, setSelectedLocation] = useState();
  // mark the place
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  };

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('Please Select a Location')
      return;
    }
    props.navigation.navigate(
      'NewPlace',
      {pickedLocation: savePickedLocation}
     );
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({saveLocation: savePickedLocation})
  }, [savePickedLocation])

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }


  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates
      && <Marker
        title="Picked Location"
        coordinate={markerCoordinates}>
        </Marker> }
    </MapView>
  );
};


MapScreen.navigationOptions = navData => {
  const saveFunction =  navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) {
   return;
  }
  return {
    headerRight: () =>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={saveFunction}
      >
        <Text style={styles.headerButtonText}>
          Save
        </Text>
      </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
