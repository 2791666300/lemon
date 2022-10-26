import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyleSheet, Text, View, ScrollView, Image, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from '../../store/actions/cart'

import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
    // console.log(props)
    const { navigation, route } = props
    const productId = route.params.productId
    const selectedProduct = useSelector(store => store.products.availableProducts.find(product => product.id === productId))

    const dispatch = useDispatch()
    useEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.productTitle
        })
    })

    useEffect(() => {

        props.navigation.setOptions({

            headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName="ios-cart"
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        props.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>

        })
    })

    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            <View style={styles.actions}>
                <Button title='Add to Cart' color={Colors.primary} onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    actions: {
        marginVertical: 15,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})

export default ProductDetailScreen
