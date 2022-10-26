import React, { useEffect } from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from '../../components/shop/ProductItem'
import axios from 'axios'

import * as cartActions from '../../store/actions/cart'

import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
    const products = useSelector(store => store.products.availableProducts)

    const dispatch = useDispatch()

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
            </HeaderButtons>,
            headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="md-menu"
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        props.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>

        })
    })
    //axios.defaults.baseURL = 'http://localhost:1000/';
    const getData = async () => {
        console.log('getData')
        const data = await axios.get('http://localhost:1000/api/v1/shopdata')//('api/v1/shopdata')
        console.log(data)
    }
    getData()


    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
    }
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductItem
                image={item.imageUrl}
                title={item.title}
                price={item.price}
                onSelect={() => { selectItemHandler(item.id, item.title) }}

            >
                <Button color={Colors.primary} title='View Details' onPress={() => { selectItemHandler(item.id, item.title) }} />
                <Button color={Colors.accent} title='To Cart' onPress={() => {
                    dispatch(cartActions.addToCart(item))
                }} />
            </ProductItem>}
        />
    )
}

export default ProductsOverviewScreen