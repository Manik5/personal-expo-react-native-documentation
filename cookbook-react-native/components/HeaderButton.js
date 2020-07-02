// setting up to add meal to favorites

import React from 'react';
import Platform from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; // importing icons
import Colors from '../constants/Color';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props} // with "...props", the component will receive all the props
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.thirdColor}
    />
  );
};

const styles = StyleSheet.create({

})

export default CustomHeaderButton;
