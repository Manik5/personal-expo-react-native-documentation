// implementing logic to sign in and sign up, check firebase documentation

// making the login persistence
import { AsyncStorage } from 'react-native';
// making the login persistence


// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'


// making the login persistence
export const AUTHENTICATE = 'AUTHENTICATE'

// logout logic
export const LOGOUT = 'LOGOUT'
// logout logic

export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

// auto logout when token expires
let timer;
// auto logout when token expires

export const setDidTryAl = () => {
	return {
		type: SET_DID_TRY_AL
	}
}

export const authenticate = (userId, token, expiryTime) => {
  // auto logout when token expires
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    // auto logout when token expires
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  }
}
// making the login persistence

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk2Fi3mKNpU2KqvPkQ1qlF09Fc1L76ZF8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      // handling error in the email
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message = "Something went wrong!"
      if (errorId === 'EMAIL_EXISTS') {
        message = "This email exists already!"
      }
      throw new Error(message);
      // handling error in the email
    }

    const responseData = await response.json();
    console.log(responseData)
    // using the token for the user login/signup / making the login persistence
    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
       )
     );
    // using the token for the user login/signup / making the login persistence

    // making the login persistence
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    // making the login persistence
  }
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk2Fi3mKNpU2KqvPkQ1qlF09Fc1L76ZF8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      // handling error in the email
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message = "Something went wrong!"
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = "This email could not be found!"
      } else if (errorId === 'INVALID_PASSWORD') {
        message = "This password is not valid!"
      }
      throw new Error(message);
      // handling error in the email
    }

    const responseData = await response.json();
    console.log(responseData)
    // using the token for the user login/signup / making the login persistence
    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );
    // using the token for the user login/signup / making the login persistence

    // making the login persistence
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    // making the login persistence
  }
};

// making the login persistence
const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  })
 );
}
// making the login persistence


// logout logic
export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};
// logout logic

// auto logout when token expires
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime);
  };
};
// auto logout when token expires
