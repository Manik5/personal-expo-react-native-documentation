// using the token for the user login/signup


// import { SIGNUP } from "../actions/auth.action";
// import { LOGIN } from '../actions/auth.action';

// making the login persistence
import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth.action';
// making the login persistence

const initialState = {
  token: null,
	userId: null,
	didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:4
      return {
        token: action.token,
				userId: action.userId,
				didTryAutoLogin: true
			}
			case SET_DID_TRY_AL:
				return {
					...state,
					didTryAutoLogin: true
				}
      case LOGOUT:
        return {
					...initialState,
					didTryAutoLogin: true
				}
      // case SIGNUP:
      // return {
      //   token: action.token,
      //   userId: action.userId
      // }
    default:
      return state;
  }
}
