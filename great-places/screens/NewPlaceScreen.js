import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button
} from "react-native";

import { useDispatch } from "react-redux";
import * as placesActions from '../redux/actions/places.action';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

import Colors from '../constants/Colors.constant';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  // saving the image
  const [selectedImage, setSelectedImage] = useState();
  // saving the image

  // updating the location
  const [selectedLocation, setSelectedLocation] = useState();
  // updating the location

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text)
  };

  // saving the image
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  }
  // saving the image

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(
      titleValue,
      selectedImage,
      selectedLocation
    )
  );
    props.navigation.goBack();
  };

  // updating the location screen when the location changes
  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);
  // updating the location screen when the location changes

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add New Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
