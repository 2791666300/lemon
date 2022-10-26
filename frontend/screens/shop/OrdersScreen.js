import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(store => store.orders.orders)

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
            </HeaderButtons>
        })
    })
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />}
        />
    )
}
export default OrdersScreen
