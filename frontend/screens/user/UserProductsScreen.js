import React, { useEffect } from "react";
import { FlatList, Button, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

import * as productsActions from "../../store/actions/products";

import Colors from "../../constants/Colors";

const UserProductsScreen = props => {
    const useProducts = useSelector(store => store.products.userProducts)

    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {

                    dispatch(productsActions.deleteProduct(id))
                }
            }]
        )
    }

    useEffect(() => {

        props.navigation.setOptions({
            headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="md-menu"
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        props.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,
            headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName="md-create"
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        props.navigation.navigate('EditProduct')
                    }}
                />
            </HeaderButtons>,
        })
    })

    return <FlatList
        data={useProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => { editProductHandler(itemData.item.id) }}
        >
            <Button color={Colors.primary} title='Edit' onPress={() => { editProductHandler(itemData.item.id) }} />
            <Button color={Colors.accent} title='Delete' onPress={deleteHandler.bind(this, itemData.item.id)} />
        </ProductItem>
        } />
}


export default UserProductsScreen