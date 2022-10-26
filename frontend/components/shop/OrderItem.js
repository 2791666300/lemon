import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CartItem from './CartItem';

import Cart from '../UI/Cart';

import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <Cart style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>

            <Button title={showDetails ? 'Hide Details' : 'Show Details' } color={Colors.primary} onPress={() => {
                setShowDetails(prevState => !prevState)
            }}
            />
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem => <CartItem

                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    amount={cartItem.sum}
                    title={cartItem.productTitle}
                    onRemove={() => {
                        dispatch(createActions.removeFromCart(cartItem.productId))
                    }}
                />)}
            </View>}
        </Cart>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 20,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    data: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%',

    }
})

export default OrderItem
