
import CartItem from "../../models/cart-item"

import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/order"
import { DELETE_PRODUCT } from "../actions/products"

const initialState = {
    items: {},
    totalAmount: 0,
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            let updateOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updateOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity;
            let updateCartItems;
            if (currentQty > 1) {
                const updateCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )

                updateCartItems = { ...state.items, [action.pid]: updateCartItem }
            } else {
                updateCartItems = { ...state.items }
                delete updateCartItems[action.pid]
            }
            return {
                ...state,
                items: updateCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state
            }
            const updateItems = { ...state.items };
            const itemTotal = state.items[action.pid].sum
            delete updateItems[action.pid]
            return {
                ...state,
                items: updateItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state
}