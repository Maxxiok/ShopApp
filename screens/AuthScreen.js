import React, {useCallback, useEffect, useReducer, useState} from "react";
import {View, ScrollView, Text, Platform, Button, StyleSheet, ActivityIndicator, Alert} from "react-native";
import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch} from "react-redux";
import {logIn, signUp} from "../store/actions/auth";

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

const AuthScreen = props => {

    const [isSignUp, setIsSignUp] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false});

    const dispatch = useDispatch();

    const authHandler = async () => {
        setError(null);
        setLoading(true);
        try {
            if(isSignUp) {
                await dispatch(signUp(formState.inputValues.email, formState.inputValues.password));
            } else {
                await dispatch(logIn(formState.inputValues.email, formState.inputValues.password));
            }
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    };

    useEffect(()=> {
        if(error){
            Alert.alert('An error occurred!', error.message, [{text: 'OK'}]);
        }
    },[error]);

    const inputChangeHandler = useCallback((input, txt, isValidity) => {
        dispatchFormState({type: 'UPDATE', value: txt, isValid: isValidity, input: input});
    }, [dispatchFormState]);

    return (
        <View style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.container}>
                    <ScrollView>
                        <Input id={'email'} label={'Email'} keyboardType={'email-address'} required email autoCapitalize={'none'} errorText={'Enter a valid email address'}
                               onInputChange={inputChangeHandler} initialValue={''}/>
                        <Input id={'password'} label={'Password'} keyboardType={'default'} secureTextEntry required minLength={5}
                               autoCapitalize={'none'} errorText={'Enter a valid password'}
                               onInputChange={inputChangeHandler} initialValue={''}/>
                        <View style={styles.buttons}>
                            {loading?<ActivityIndicator size={'small'} color={Colors.primary}/>
                            :<Button title={isSignUp?'Sign Up':'Login'} color={Colors.primary} onPress={authHandler}/>}
                        </View>
                        <View style={styles.buttons}>
                            <Button title={`Switch To ${isSignUp?'Login':'Sign Up'}`} onPress={()=>setIsSignUp(state=>!state)} color={Colors.accent}/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    container: {
        width: '90%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        marginTop: 20
    },
    gradient: {
        flex: 1,
        alignItems: 'center'
    },
    buttons: {
        marginTop: 10
    }
});

export default AuthScreen;
