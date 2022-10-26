import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Cart from '../UI/Cart';

const ProductItem = props => {
    const { image, title, price, onSelect } = props

    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android') {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <Cart style={styles.product}>
            <TouchableCmp onPress={onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>${price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </Cart>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        marginVertical: 15,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 5,
    },
    title: {
        fontSize: 18,
        marginVertical: 4,

    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem
