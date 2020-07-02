// put the style of the CategoryScreen here, breaking it into small components

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native';

const CategoryGrid = props => {
  let TouchableComponent = TouchableOpacity;

  if(Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
   return (
     <View style={styles.gridItem}>
       <TouchableComponent style={styles.touchable} onPress={props.onSelect}>
         <View
           style={
             // merging the styles together, from the props and from this component itself
             { ...styles.container, ...{ backgroundColor: props.color } }
           }
           // merging the styles together, from the props and from this component itself
         >
           <Text style={styles.title} numberOfLines={2}>
             {props.title}
           </Text>
         </View>
       </TouchableComponent>
     </View>
   );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    // fontFamily: 'open-sans',
    fontSize: 15
  },
  touchable: {
    flex: 1
  }
});

export default CategoryGrid;
