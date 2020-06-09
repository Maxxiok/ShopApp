import React from "react";
import {View, Text, StyleSheet, Image, Button, TouchableNativeFeedback} from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = props => {
    return (
            <Card style={styles.product}>
                <View style={styles.touchable}>
                    <TouchableNativeFeedback onPress={props.onSelect} >
                        <View>
                            <View style={styles.imgContainer}><Image style={styles.image} source={{uri: props.image}}/></View>
                            <View style={styles.details}>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.btns}>
                                {props.children}
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    imgContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    }
});

export default ProductItem;
