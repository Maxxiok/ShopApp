import React, {useCallback, useEffect, useState} from "react";
import {View, FlatList, Text, Platform, Button, ActivityIndicator} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../components/shop/ProductItem";
import {addToCart} from "../store/actions/cart";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import Colors from "../constants/Colors";
import {fetchProducts} from "../store/actions/products";


const ProductsOverviewScreen = props => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadPrd = useCallback(async ()=>{
        setErr(null);
        setRefreshing(true);
        try{
            await dispatch(fetchProducts());
        } catch (e) {
            setErr(e);
        }
        setRefreshing(false);
    }, [setLoading, dispatch, setErr]);

    useEffect(()=> {
        setLoading(true);
        loadPrd().then(()=> setLoading(false));
    }, [dispatch, loadPrd]);

    useEffect(()=> {
        const listenerFunc = props.navigation.addListener('focus', ()=>{loadPrd()});
        return (()=> {
            listenerFunc();
        });
    }, [loadPrd]);

    const products = useSelector(state=>state.products.availableProducts);

    if (err) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>An Error Occurred!</Text>
            <Button title={'Try Again'} onPress={loadPrd} color={Colors.primary}/>
        </View>;
    }

    if(loading){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={Colors.primary}/></View>;
    }

    if(!loading&& products.length===0){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>No Products Found</Text></View>;
    }

    return(
        <FlatList data={products} onRefresh={loadPrd} refreshing={refreshing}
                  renderItem={itemData=><ProductItem image={itemData.item.imageUrl} price={itemData.item.price} title={itemData.item.title}
                  onSelect={()=>props.navigation.navigate('ProductDetails', {productId: itemData.item.id, titleTxt: itemData.item.title})}>
                      <Button color={Colors.primary} title={'Details'} onPress={()=>props.navigation.navigate({routeName: 'ProductDetails', params: {productId: itemData.item.id, titleTxt: itemData.item.title}})}/>
                      <Button color={Colors.primary} title={'To Cart'} onPress={()=>{dispatch(addToCart(itemData.item))}}/>
                  </ProductItem>}/>
    );

};

export const screenOptions = navData => {
    return ({
        headerTitle: 'Available Products',
        headerLeft: () => {return (<HeaderButtons
            HeaderButtonComponent={CustomHeaderButton}><Item title={'Menu'} iconName={Platform.OS==='android'?'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/></HeaderButtons>)},
        headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}><Item title={'Cart'} iconName={Platform.OS==='android'?'md-cart':'ios-cart'}
                                                                                         onPress={()=>{navData.navigation.navigate('Cart')}}/></HeaderButtons>
    });
};

export default ProductsOverviewScreen;

