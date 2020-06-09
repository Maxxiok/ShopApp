import React, {useState} from "react";
import {View, Text, StyleSheet, FlatList, Button, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../constants/Colors";
import CartItem from "../components/shop/CartItem";
import {removeFromCart} from "../store/actions/cart";
import {addOrder} from "../store/actions/order";
import ProductsOverviewScreen from "./ProductsOverviewScreen";
import Card from "../components/UI/Card";


const CartScreen = props => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const totalOrderAmt = useSelector(state=> state.cart.total);

    const cartItems = useSelector(state=> {
        const cartItms=[];
        for (const key in state.cart.items){
            cartItms.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                total: state.cart.items[key].total
            })
        }
        return cartItms.sort((a,b)=>a.productId>b.productId?1:-1);
    });

    const addOrderHandler = async ()=>{
        setLoading(true);
        await dispatch(addOrder(cartItems, totalOrderAmt));
        setLoading(false);
    };

    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(totalOrderAmt.toFixed(2)*100)/100}</Text></Text>
                {loading?<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'small'} color={Colors.primary}/></View>
                    :<Button color={Colors.accent} title={'Order Now'} onPress={addOrderHandler} disabled={cartItems.length===0}/>}
            </Card>
            <FlatList data={cartItems}
                      renderItem={itemData=><CartItem qty={itemData.item.quantity}
                                                      title={itemData.item.productTitle}
                                                      totalAmt={itemData.item.total}
                                                      deletable
                                                      onRemove={()=>{dispatch(removeFromCart(itemData.item.productId))}}/>}
                      keyExtractor={item=>item.productId}/>
        </View>
    );
};

export const screenOptions = {
    headerTitle: 'Shopping Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;
