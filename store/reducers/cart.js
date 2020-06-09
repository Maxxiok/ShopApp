import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import {CartItem} from "../../models/cart-item";
import {ADD_ORDER} from "../actions/order";
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    items: {},
    total: 0
};

const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            let updOrNewItem;
            if (state.items[addedProduct.id]) {
                updOrNewItem = new CartItem(state.items[addedProduct.id].quantity+1,addedProduct.price, addedProduct.title, state.items[addedProduct.id].total+addedProduct.price);
            } else {
                updOrNewItem = new CartItem(1, addedProduct.price, addedProduct.title, addedProduct.price);
            }
            return {...state, items: {...state.items, [addedProduct.id]: updOrNewItem}, total: state.total+addedProduct.price};
        case REMOVE_FROM_CART:
            const cartItem = state.items[action.productId]
            const currentQty = cartItem.quantity;
            let updItems;
            if (currentQty>1){
                const updItem = new CartItem(cartItem.quantity-1, cartItem.productPrice, cartItem.productTitle, cartItem.total-cartItem.productPrice);
                updItems = {...state.items, [action.productId]: updItem};
            } else {
                updItems = {...state.items};
                delete updItems[action.productId];
            }
            return {...state, items: updItems, total: state.total - cartItem.productPrice};
        case ADD_ORDER:
            return {...state, items: {}, total: 0};
        case DELETE_PRODUCT:
            if(!state.items[action.productId]){
                return {...state};
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.productId].total;
            delete updatedItems[action.productId];
            return {...state, items: updatedItems, total: state.total-itemTotal};
        default:
            return {...state}
    }
};

export default cartReducer;
