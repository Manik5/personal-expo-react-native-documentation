import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import ENV from '../env';


const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${props.location.lat},${props.location.lng}/400x200?access_token=${ENV.mapBoxApiKey}`
  }

  return (
    <TouchableOpacity
      style={{...styles.mapPreview, ...props.style}}
      onPress={props.onPress}
    >
      {props.location
      ? <Image
          style={styles.mapImage}
          source={{uri: imagePreviewUrl}}
       />
      : props.children}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;


