import {Product} from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const deleteProduct = prodId => {
    return async (dispatch, getState) => {
        const response = await fetch(`https://shop-app-da54d.firebaseio.com/products/${prodId}.json?auth=${getState().auth.token}`,
            {method: 'DELETE'});

        if(!response.ok) {
            throw new Error('Wrong response code');
        }
        dispatch({type: DELETE_PRODUCT, productId: prodId});
    }
};

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(`https://shop-app-da54d.firebaseio.com/products.json?auth=${getState().auth.token}`);

            if(!response.ok) {
                throw new Error('Wrong response code');
            }

            const resData = await response.json();
            const products = [];

            for(const key in resData){
                products.push(new Product(key, resData[key].ownerId, resData[key].title, resData[key].imageUrl, resData[key].descr, resData[key].price));
            }
            dispatch({type: SET_PRODUCTS, products: products, userProducts: products.filter(prod=>prod.ownerId===getState().auth.userId)})
        } catch (e) {
            throw e;
        }

    };
};

export const createProduct = (title, descr, imageUrl, price) => {
    return async (dispatch, getState)=> {
        const response = await fetch(`https://shop-app-da54d.firebaseio.com/products.json?auth=${getState().auth.token}`,
            {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title, descr, imageUrl, price, ownerId: getState().auth.userId})});

        const resData = await response.json();

        dispatch({type: CREATE_PRODUCT, product: {id: resData.name, title, description: descr, imageUrl, price, ownerId: getState().auth.userId}});

    };
};

export const updateProduct = (id, title, descr, imageUrl) => {
    return async (dispatch, getState)=> {

        const response = await fetch(`https://shop-app-da54d.firebaseio.com/products/${id}.json?auth=${getState().auth.token}`,
            {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title, descr, imageUrl})});

        if(!response.ok) {
            throw new Error('Wrong response code');
        }

        dispatch({type: UPDATE_PRODUCT, prodId: id, product: {title, description: descr, imageUrl}});
    }
};
