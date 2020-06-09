import {CREATE_PRODUCT} from "./products";
import {Product} from "../../models/product";
import {Order} from "../../models/order";

export const ADD_ORDER='ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmt) => {
    return async (dispatch, getState) =>{
        const date = new Date().toISOString();
        const response = await fetch(`https://shop-app-da54d.firebaseio.com/orders/${getState().auth.userId}.json?auth=${getState().auth.token}`,
            {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({items: cartItems, total: totalAmt, date: date})});

        const resData = await response.json();

        if(!response.ok) {
            throw new Error('Wrong response code');
        }

        dispatch({type: ADD_ORDER, orderData: {id: resData.name, items: cartItems, total: totalAmt, date: date}});
    }
};

export const fetchOrders = () => {
    return async (dispatch, getState) =>{
        try {
            const response = await fetch(`https://shop-app-da54d.firebaseio.com/orders/${getState().auth.userId}.json?auth=${getState().auth.token}`);

            if (!response.ok) {
                throw new Error('Wrong response code');
            }

            const resData = await response.json();
            const orders = [];

            for (const key in resData) {
                orders.push(new Order(key, resData[key].items, resData[key].total, new Date(resData[key].date)));
            }

            dispatch({type: SET_ORDERS, orders:orders});
        } catch (e) {
            throw e;
        }
    };
};
