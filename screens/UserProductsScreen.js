import React from "react";
import {View, Text, StyleSheet, FlatList, Button, Platform, Alert} from "react-native";
import ProductItem from "../components/shop/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import Colors from "../constants/Colors";
import {addToCart} from "../store/actions/cart";
import {deleteProduct} from "../store/actions/products";

const UserProductsScreen = props => {

    const userProds = useSelector(state=>state.products.userProducts);

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item',
            [{text: 'No', style: 'default'},
                {text: 'Yes', style: 'cancel', onPress:()=>{dispatch(deleteProduct(id))}}])
    };

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id});
    }

    if(userProds.length===0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>No Products Found</Text></View>
    }

    return <FlatList data={userProds} keyExtractor={item=> item.id}
                     renderItem={itemData=> <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={()=>editProductHandler(itemData.item.id)}>
                         <Button color={Colors.primary} title={'Edit'} onPress={()=>editProductHandler(itemData.item.id)}/>
                         <Button color={Colors.primary} title={'Delete'} onPress={()=>deleteHandler(itemData.item.id)}/>
                     </ProductItem>}/>
};

export const screenOptions = navData => {
    return ({
        headerTitle: 'Your Products',
        headerLeft: () => {return (<HeaderButtons
            HeaderButtonComponent={CustomHeaderButton}><Item title={'Menu'} iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/></HeaderButtons>)},
        headerRight: ()=> {return (<HeaderButtons
            HeaderButtonComponent={CustomHeaderButton}><Item title={'Add'} iconName={Platform.OS==='android'?'md-create':'ios-create'}
                                                             onPress={()=>{navData.navigation.navigate('EditProduct')}}/></HeaderButtons>)}
    });
};

export default UserProductsScreen;
