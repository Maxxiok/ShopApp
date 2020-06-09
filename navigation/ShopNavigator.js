import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import ProductsOverviewScreen, {screenOptions as productOverViewScreenOptions} from "../screens/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import {Platform,SafeAreaView, Button, View} from "react-native";
import ProductDetailsScreen, {screenOptions as productDetailsOptions} from "../screens/ProductDetailsScreen";
import CartScreen, {screenOptions as cartScreenOptions} from "../screens/CartScreen";
import OrdersScreen, {screenOptions as ordersScreenOptions} from "../screens/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import UserProductsScreen, {screenOptions as userProductsScreenOptions} from "../screens/UserProductsScreen";
import EditProductScreen, {screenOptions as editProductsScreenOptions} from "../screens/EditProductScreen";
import AuthScreen from "../screens/AuthScreen";
import {useDispatch} from "react-redux";
import {logout} from "../store/actions/auth";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS==='android'?Colors.primary:''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS==='android'?'white':Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = ()=>{
    return <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen name={'ProductsOverview'} component={ProductsOverviewScreen} options={productOverViewScreenOptions}/>
        <ProductsStackNavigator.Screen name={'ProductDetails'} component={ProductDetailsScreen} options={productDetailsOptions}/>
        <ProductsStackNavigator.Screen name={'Cart'} component={CartScreen} options={cartScreenOptions}/>
    </ProductsStackNavigator.Navigator>
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen name={'Order'} component={OrdersScreen} options={ordersScreenOptions}/>
    </OrdersStackNavigator.Navigator>
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen name={'UserProducts'} component={UserProductsScreen} options={userProductsScreenOptions}/>
        <AdminStackNavigator.Screen name={'EditProduct'} component={EditProductScreen} options={editProductsScreenOptions}/>
    </AdminStackNavigator.Navigator>
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return <ShopDrawerNavigator.Navigator drawerContent={props => {
        return <View style={{flex:1, paddingTop: 30}}>
            <SafeAreaView forceInset={{top: 'always',horizontal: 'never'}}>
                <DrawerItemList {...props}/>
                <View style={{width: '100%', paddingHorizontal: 2}}>
                    <Button title={'Logout'} color={Colors.primary} onPress={()=>{dispatch(logout())}}/>
                </View>
            </SafeAreaView>
        </View>
    }} drawerContentOptions={{activeTintColor: Colors.primary}}>
        <ShopDrawerNavigator.Screen name={'Products'} component={ProductsNavigator}
        options={{
            drawerIcon: props=><Ionicons name={Platform.OS==='android'?'md-cart':'ios-cart'} size={23} color={props.color}/>
        }}/>
        <ShopDrawerNavigator.Screen name={'Orders'} component={OrdersNavigator}
        options={{
            drawerIcon: props=><Ionicons name={Platform.OS==='android'?'md-list':'ios-list'} size={23} color={props.color}/>
        }}/>
        <ShopDrawerNavigator.Screen name={'Admin'} component={AdminNavigator} options={{
            drawerIcon: props=><Ionicons name={Platform.OS==='android'?'md-create':'ios-create'} size={23} color={props.color}/>
        }}/>
    </ShopDrawerNavigator.Navigator>
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen name={'Login'} component={AuthScreen}/>
    </AuthStackNavigator.Navigator>
};


