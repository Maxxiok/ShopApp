import {ADD_ORDER, SET_ORDERS} from "../actions/order";
import {Order} from "../../models/order";

const initialState = {
    orders: []
};

const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const order = new Order(action.id, action.orderData.items, action.orderData.total, action.date);
            return {...state, orders: state.orders.concat(order)};
        case SET_ORDERS:
            return {...state, orders: action.orders};
        default:
            return {...state};
    }
};

export default orderReducer;
