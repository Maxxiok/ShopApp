import React, {useState} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.total}>${props.amt.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails?'Hide Details':'Show Details'} onPress={()=>{setShowDetails(prevState=>!prevState)}}/>
            {showDetails&&<View style={styles.details}>
                {props.items.map(cartItem => <CartItem key={cartItem.productId} qty={cartItem.quantity} title={cartItem.productTitle} totalAmt={cartItem.total}/>)}
            </View>}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    total: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    details: {
        width: '100%'
    }
});

export default OrderItem;
