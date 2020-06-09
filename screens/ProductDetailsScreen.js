import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {ScrollView, View, Text, StyleSheet, Image, Button} from "react-native";
import Colors from "../constants/Colors";
import {addToCart} from "../store/actions/cart";

const ProductDetailsScreen = props => {

    const productId = props.route.params?props.route.params.productId:null;

    const dispatch = useDispatch();

    const product = useSelector(state=> state.products.availableProducts.find(prod=> prod.id===productId));

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>
            <View>
                <Button color={Colors.accent} title={'Add to Cart'} onPress={()=>{dispatch(addToCart(product))}}/>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.descr}>{product.description}</Text>
        </ScrollView>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params?navData.route.params.titleTxt:null
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    descr: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center'
    }
});

export default ProductDetailsScreen;
