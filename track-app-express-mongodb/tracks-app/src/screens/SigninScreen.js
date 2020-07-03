import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = props => {
  const { state, signin } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account yet? Sign up instead"
      />
    </View>
  )
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  },
});

export default SigninScreen;
