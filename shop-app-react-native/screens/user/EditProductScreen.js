import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';

// icons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
// icons

// redux
import {useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../redux/actions/product.action';
// redux

import Input from '../../components/UI/Input';
import Colors from '../../constants/ColorConstant';
// merge all the state
const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
  return state;
}
// merge all the state

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  // saving into firebase the items in the cart
  const [error, setError] = useState('')
  // saving into firebase the items in the cart

	// populate the item

	// nav v.4
	// props.navigation.getParam('productId')
	// nav v.4

  const prodId = props.route.params ? props.route.params.productId : null ;
  const editedProduct = useSelector(
    state => state.products.userProducts.find(
      prod => prod.id === prodId))
  // populate the item
  const dispatch = useDispatch();

  // merge all the state
      const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities:{
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          price: editedProduct ? true : false,

        },
        formIsValid: editedProduct ? true : false
      });
  // merge all the state

  // error message to display in the EditProductScreen
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay'}])
    }
  }, [error])
  // error message to display in the EditProductScreen

  // submitting the changes
  const submitHandler = useCallback( async () => {
    // validate user input
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please try again', [
        { text: 'Okay' }
      ])
      return;
    }
    // validate user input

    // saving into firebase the items in the cart
    setError(null);
    setIsLoading(true);
    // saving into firebase the items in the cart


    // redux to create or update an item
    // saving into firebase the items in the cart
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
        ))
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price // the + is for converting it into a number
          ))
            // saving into firebase the items in the cart
      }
    } catch (error) {
      setError(error.message)
    }
    // saving into firebase the items in the cart
    setIsLoading(false)
    // saving into firebase the items in the cart

    props.navigation.goBack();
    // redux to create or update an item

  }, [dispatch, prodId, formState])

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            // icons
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            // icons
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler])
  // submitting the changes

  // validate user input / merge all the state
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState])
  // validate user input / merge all the state

  // loading spinner
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }
  // loading spinner

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={40}
    >
      <ScrollView>
        <View style={styles.form}>
         <Input
            id="title"
            label="Title"
            errorText="Please, enter a valid title"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please, enter a valid image url"
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValid={!!editedProduct}
            required
           />
          { editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please, enter a valid price"
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please, enter a valid description"
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
};

// UserProductsScreen.navigationOptions --> nav v.4

export const screenOptions = navData => {
  // submitting the changes
  // const submitFunction = navData.route.params ? navData.route.params.submit : null;
	// submitting the changes
	const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId
    ? 'Edit Product'
    : 'Add Product',
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EditProductScreen;

// REMOVED AFTER MERGING ALL THE STATE

// hooks
// const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')


// // validate user input
// const [ titleIsValid, setTitleIsValid ] = useState(false)
// // validate user input

// const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
// const [price, setPrice] = useState('')
// const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
// // hooks

// REMOVED AFTER MERGING ALL THE STATE
