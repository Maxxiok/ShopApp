import React, {useEffect, useCallback, useReducer, useState} from "react";
import {
    View,
    Text,
    Platform,
    Button,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import {useSelector, useDispatch} from "react-redux";
import {createProduct, deleteProduct, updateProduct} from "../store/actions/products";
import Input from "../components/UI/Input";
import Colors from "../constants/Colors";

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updatedValues = {...state.inputValues, [action.input]: action.value};
        const updatedValidities = {...state.inputValidities, [action.input]: action.isValid};
        let formIsValid = true;
        for (const key in updatedValidities){
            formIsValid = formIsValid && updatedValidities[key];
        }
        return {...state, inputValues: updatedValues, inputValidities: updatedValidities, formIsValid: formIsValid};
    } else {
        return {...state};
    }
};

const EditProductScreen = props => {

    const prodId = props.route.params?props.route.params.productId:null;

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const edProd = useSelector(state=> state.products.userProducts.find(prod=>prod.id===prodId));

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: edProd?edProd.title:'',
            imageUrl: edProd?edProd.imageUrl:'',
            price: '',
            descr: edProd?edProd.description:''
        },
        inputValidities: {
            title: edProd?true:false,
            imageUrl: edProd?true:false,
            price: edProd?true:false,
            descr: edProd?true:false
        },
        formIsValid: edProd?true:false});


    const dispatch = useDispatch();

    const submitHandler = useCallback(async ()=> {
        if(!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Please check errors in the form',
                [{text: 'OK', style: 'default'}]);
            return;
        }
        setLoading(true);
        setErr(null);
        try {
            if(edProd){
                await dispatch(updateProduct(prodId, formState.inputValues.title, formState.inputValues.descr, formState.inputValues.imageUrl));
            } else {
                await dispatch(createProduct(formState.inputValues.title, formState.inputValues.descr, formState.inputValues.imageUrl, +formState.inputValues.price));
            }
            props.navigation.goBack();
        } catch (e) {
            setErr(e.message);
        }
        setLoading(false);

    }, [dispatch, edProd, prodId, formState]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: ()=> {return (<HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}><Item title={'Save'} iconName={Platform.OS==='android'?'md-checkmark':'ios-checkmark'}
                                                                 onPress={()=>submitHandler()}/></HeaderButtons>)}
        });
    }, [submitHandler]);

    useEffect(()=> {
        if(err){
            Alert.alert('An error occurred!', err, [{text: 'OK'}]);
        }
    },[err]);

    const inputChangeHandler = useCallback((input, txt, isValidity) => {
        dispatchFormState({type: 'UPDATE', value: txt, isValid: isValidity, input: input});
    }, [dispatchFormState]);

    if (loading){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={Colors.primary}/></View>;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
            <ScrollView>
                <View style={styles.formCtrl}>
                    <Input
                        id={'title'}
                        keyboardType='default' autoCapitalize='words'
                        autoCorrect returnKeyType="next" label={'Title'}
                        errorText={'Please enter a valid product title'}
                        onInputChange={inputChangeHandler}
                        initialValue={edProd?edProd.title:''}
                        initialValid={!!edProd}
                        required
                    />
                    <Input
                        id={'imageUrl'}
                        keyboardType='default'
                        returnKeyType="next" label={'Image Url'}
                        errorText={'Please enter a valid url'}
                        initialValue={edProd?edProd.imageUrl:''}
                        initialValid={!!edProd}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    {edProd? null:<Input
                        id={'price'}
                        keyboardType='decimal-pad' label={'Price'}
                        required min={0.1} errorText={'Please enter a valid price'}
                        onInputChange={inputChangeHandler}
                    />}
                    <Input
                        id={'descr'}
                        keyboardType='default' autoCapitalize='sentences'
                        autoCorrect multiline numberOfLines={3}
                        label={'Description'} errorText={'Please enter a product description'}
                        initialValue={edProd?edProd.description:''}
                        initialValid={!!edProd}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    formCtrl: {
        margin: 20
    }
});

export const screenOptions = navData => {
    return ({
        headerTitle: navData.route.params?navData.route.params.productId?'Edit Product':'Add Product':null,
    });
};

export default EditProductScreen;
