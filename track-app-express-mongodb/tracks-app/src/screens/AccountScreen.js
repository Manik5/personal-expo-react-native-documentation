import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = props => {
	const { signout } = useContext(AuthContext);

	return(
	  <View>
	    <Text>AccountScreen</Text>
			<Spacer>
				<Button
					title="Sign Out"
					onPress={signout}
				/>
			</Spacer>
	  </View>
	)
};

const styles = StyleSheet.create({

});

export default AccountScreen;
