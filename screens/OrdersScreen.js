import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Platform, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import OrderItem from "../components/shop/OrderItem";
import {fetchOrders} from "../store/actions/order";
import Colors from "../constants/Colors";

const OrdersScreen = props => {
    const order = useSelector(state=>state.orders.orders);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const fetchOrdersHandler = useCallback(() => {
        setLoading(true);
        dispatch(fetchOrders()).then(()=> setLoading(false));
    }, [setLoading, dispatch]);

    useEffect(()=>{
        fetchOrdersHandler();
    }, [dispatch, fetchOrdersHandler]);

    useEffect(()=> {
        const listener = props.navigation.addListener('willFocus', ()=>{fetchOrdersHandler()});
        return (()=> {
            listener.remove();
        });
    }, [fetchOrdersHandler]);

    if(loading){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={Colors.primary}/></View>;
    }

    if(order.length===0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>No Orders Found</Text></View>
    }

    return (
        <FlatList data={order} renderItem={(itemData)=><OrderItem amt={itemData.item.total} date={itemData.item.readableDate} items={itemData.item.items}/>}/>
    );
};

export const screenOptions = navData => {
    return ({
        headerLeft: () => {return (<HeaderButtons
            HeaderButtonComponent={CustomHeaderButton}><Item title={'Menu'} iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/></HeaderButtons>)}
    });
}

export default OrdersScreen;
