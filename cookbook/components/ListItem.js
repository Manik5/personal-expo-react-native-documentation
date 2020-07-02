import React from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultText from '../components/DefaultText';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>
        {props.children}
      </DefaultText>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20
  }
})

export default ListItem;
