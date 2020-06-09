import PRODUCTS from "../../data/sample-data";
import {CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT} from "../actions/products";
import {Product} from "../../models/product";

const initialState = {
    availableProducts: [],
    userProducts: []
};

export const productsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, availableProducts: action.products, userProducts: action.userProducts};
        case CREATE_PRODUCT:
            const newProd = new Product(action.product.id, action.product.ownerId, action.product.title, action.product.imageUrl, action.product.description, action.product.price);
            return {...state, availableProducts: state.availableProducts.concat(newProd), userProducts: state.userProducts.concat(newProd)};
        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex(prod=> prod.id === action.prodId);
            const updProduct = new Product(action.prodId, state.userProducts[prodIndex].ownerId, action.product.title, action.product.imageUrl, action.product.description, state.userProducts[prodIndex].price)
            const updUserProds = [...state.userProducts];
            updUserProds[prodIndex]=updProduct;
            const availProdIndex = state.availableProducts.findIndex(prod=> prod.id === action.prodId);
            const updAvailProducts = [...state.availableProducts];
            updAvailProducts[availProdIndex] = updProduct;
            return {...state, availableProducts: updAvailProducts, userProducts: updUserProds}
        case DELETE_PRODUCT:
            return {...state, userProducts: state.userProducts.filter(prod=>prod.id!==action.productId),
                availableProducts: state.availableProducts.filter(prod=>prod.id!==action.productId)}
        default:
            return {...state};
    }
    return {...state};
}

export default productsReducer;
