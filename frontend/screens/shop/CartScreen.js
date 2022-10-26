import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import * as createActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

import Cart from '../../components/UI/Cart';

import Colors from '../../constants/Colors';

const CartScreen = props => {

    const cartTotalAmount = useSelector(store => store.cart.totalAmount)
    const dispatch = useDispatch()
    const cartItems = useSelector(store => {
        const transformedCartItems = [];

        for (const key in store.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: store.cart.items[key].productTitle,
                productPrice: store.cart.items[key].productPrice,
                quantity: store.cart.items[key].quantity,
                sum: store.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    return (
        <View style={styles.screen}>
            <Cart style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>
                        ${Math.round(cartTotalAmount.toFixed(2)* 100) / 100 }
                    </Text>
                </Text>
                <Button
                    title='Order Now'
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </Cart>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={
                    ({ item }) => <CartItem
                        quantity={item.quantity}
                        title={item.productTitle}
                        amount={item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(createActions.removeFromCart(item.productId))
                        }}
                    />}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    },
})

export default CartScreen
