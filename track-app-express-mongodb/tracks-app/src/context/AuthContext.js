import createDataContext from './createDataContext';


const authReducer = (state, action) => {
	switch (action.type) {
		case value:

			break;

		default:
			return state;
	}
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{},
	{ isSignedIn: false }
);
