import React, { useEffect, useCallback, useReducer } from "react";
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

import * as productsActions from "../../store/actions/products"


import Colors from "../../constants/Colors";


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.value
        }

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const EditProductScreen = props => {
    const prodId = props.route.params?.productId

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [formState, dispatchFormStart] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct?.title,
            imageUrl: editedProduct?.imageUrl,
            price: '',
            description: editedProduct?.description
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    })
    const { title, imageUrl, price, description } = formState.inputValues

    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('输入错误', '请重新输入或者检查是否输错了', [
                { text: 'Okay' }
            ])
            return
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl))
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price))
        }

        props.navigation.goBack()
    }, [dispatch, prodId, formState])


    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params?.productId ? 'Edit Product' : 'Add Product',
            headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName="md-checkmark"
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={submitHandler}
                />
            </HeaderButtons>,
        })
    })


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormStart({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        }
        )
    }, [dispatchFormStart])

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">   
            <ScrollView>
                <View style={styles.from}>
                    <Input
                        id='title'
                        label='title'
                        errorText='Please enter a valid title!'
                        keyboardType={props.keyboardType}
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct?.title}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter a valid image url!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct?.imageUrl}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {!editedProduct && <Input
                        id='price'
                        label='Price'
                        errorText='Please enter a valid price!'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                    }
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct?.description}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    from: {
        margin: 20,
    }
})

export default EditProductScreen