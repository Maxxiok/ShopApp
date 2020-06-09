import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = props => {
    return(
        <View style={styles.cart}>
            <View style={styles.data}>
                <Text style={styles.qty}>{props.qty} </Text><Text style={styles.txt}>{props.title}</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.txt}>${props.totalAmt.toFixed(2)}</Text>
                {props.deletable&&<TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                    <Ionicons name={Platform.OS==='android'?'md-trash':'ios-trash'} size={23} color='red'/>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cart: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    data: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    qty: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    txt: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    delete: {
        marginLeft: 20
    }
});

export default CartItem;
