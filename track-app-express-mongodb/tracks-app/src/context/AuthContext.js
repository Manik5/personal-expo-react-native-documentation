import createDataContext from './createDataContext';


const authReducer = (state, action) => {
  switch (action.type) {
    case value:

      break;

    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign up with that email and password

    // if we sign up, modify ur state and say that we are authenticated

    // if signing up fails, we need to reflect an error message somewhere
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // Try to signin

    // Handle success by updating state

    // Handle failure by showing error message
  };
};

const signout = (dispatch) => {
  return () => {
    // somehow sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {signin, signout, signup},
  { isSignedIn: false }
);
