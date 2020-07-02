// saving the image locally
import * as FileSystem from 'expo-file-system';
// saving the image locally

import ENV from '../../env';


export const ADD_PLACE = 'ADD_PLACE'

// fetching data from the local database
export const SET_PLACES = 'SET_PLACES';
// fetching data from the local database

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const addPlace = (title, image, location) => {
  // saving the image locally
  return async dispatch => {
    // geocoding
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/-122.463%2C%2037.7648.json?${location.lat},${location.lng}access_token=${ENV.mapBoxApiKey}`
    );
    // geocoding
    if (!response.ok) {
      throw new Error('Something went wrong');
    };

    const responseData = await response.json();
    if (!responseData.result) {
      throw new Error('Something went wrong');
    }

    const address = responseData.results[0].formatted_address;

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
       );
       console.log(dbResult)
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch ({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title: title,
        image: newPath,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng
        }
      }
    })
  };
  // saving the image locally
};

// fetching from the local database
export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  }
}
// fetching from the local database


