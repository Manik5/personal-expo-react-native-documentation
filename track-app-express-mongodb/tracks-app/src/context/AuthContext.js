import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';


const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SIGNIN':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGNIN', payload: response.data.token })

    navigate('TrackList')
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with Sign Up'
    });
  };
};

const signin = (dispatch) => async ({ email, password }) => {
  // Try to signin
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGNIN', payload: response.data.token});

    navigate('TrackList')
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: 'Something went wrong with sign in'
    });
  };
  // Handle success by updating state

  // Handle failure by showing error message
};

const signout = (dispatch) => {
  return () => {
    // somehow sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {signin, signout, signup},
  { isSignedIn: null, errorMessage: '' }
);
