import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler'
import 'react-native-reanimated'

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";


const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator()
const ProductsStack = createNativeStackNavigator()
const OrdersStack = createNativeStackNavigator()
const AdminStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    presentation: 'modal',

}

const ProductNavigator = () => {
    return (

        <ProductsStack.Navigator initialRouteName="ProductsOverviewScreen" screenOptions={defaultNavOptions}>
            <ProductsStack.Screen
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={{
                    headerTitle: 'All Products'
                }}
            />
            <ProductsStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    headerTitle: 'Product Detail'
                }}
            />
            <ProductsStack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    headerTitle: 'Your Cart'
                }}
            />
        </ProductsStack.Navigator>

    )
}

const OrdersNavigator = () => {
    return (
        <OrdersStack.Navigator screenOptions={defaultNavOptions}>
            <OrdersStack.Screen
                name="OrdersScreen"
                component={OrdersScreen}
                options={{
                    headerTitle: 'Your Order'
                }}
            />
        </OrdersStack.Navigator>
    )
}

const AdminNavigator = () => {
    return (
        <AdminStack.Navigator screenOptions={defaultNavOptions}>
            <AdminStack.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={{
                    headerTitle: 'Your Products'
                }}
            />
            <AdminStack.Screen
                name="EditProduct"
                component={EditProductScreen}
            />
        </AdminStack.Navigator>
    )
}

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerShown: false,

            }}>
                <Drawer.Screen
                    name="Products"
                    component={ProductNavigator}
                    options={{
                        drawerIcon: drawerConfig => <Ionicons name="md-list" size={23} color={drawerConfig.color} />,
                    }}
                />
                <Drawer.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        drawerIcon: drawerConfig => <Ionicons name="md-cart" size={23} color={drawerConfig.color} />,
                    }}
                />
                <Drawer.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        drawerIcon: drawerConfig => <Ionicons name="md-create" size={23} color={drawerConfig.color} />,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default ShopNavigator







