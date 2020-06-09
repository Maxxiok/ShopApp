import React, {useState} from 'react';
import {createStore,combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import productsReducer from "./store/reducers/products";
import ProductsNavigator from "./navigation/ShopNavigator";
import {enableScreens} from "react-native-screens";
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import cartReducer from "./store/reducers/cart";
import {composeWithDevTools} from "redux-devtools-extension";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import NavigationContainer from "./navigation/NavigationContainer";

enableScreens();

const fetchFonts = async () => {
    await Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const rootReducer =  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if(!fontsLoaded){
        return <AppLoading startAsync={fetchFonts} onFinish={()=>setFontsLoaded(true)} onError={(error)=>console.log(error)}/>
    }

    return (
      <Provider store={store}>
        <NavigationContainer/>
      </Provider>
    );
}
