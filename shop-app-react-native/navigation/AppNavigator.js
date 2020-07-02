import React from 'react';
import { useSelector } from 'react-redux';

// navigation v.5
import { NavigationContainer } from '@react-navigation/native';
// navigation v.5

import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartScreen from '../screens/StartScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);

  return (
    // navigation v.5
    <NavigationContainer>
			{isAuth && <ShopNavigator />}
			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <StartScreen />}
    </NavigationContainer>
    // navigation v.5
    )
  }

  export default AppNavigator;


  // navigation v.4

	// import ShopNavigator from './ShopNavigator';

	// import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';


  // import { NavigationActions } from 'react-navigation';

  // const navRef = useRef();

  // <ShopNavigator ref={navRef} />


  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(
  //       NavigationActions.navigate({routeName: 'Auth'}))
  //   }
  // }, [isAuth]);

  // navigation v.4
