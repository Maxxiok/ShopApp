import React, {useEffect} from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";
import {authenticate, setTryAutologin} from "../store/actions/auth";

const StartupScreen = props => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const tryLogIn = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(userData){
                const transfData = JSON.parse(userData);
                const {token, userId, expiryDate} = transfData;
                const expDate = new Date(expiryDate);
                if(expDate<=new Date()||!token||!userId){
                    dispatch(setTryAutologin());
                    return;
                }

                const expTime = expDate.getTime() - new Date().getTime();

                //props.navigation.navigate('Shop');
                dispatch(authenticate(userId, token, expTime));
            } else {
                dispatch(setTryAutologin());
                return;
            }

        };
        tryLogIn();
    }, [dispatch]);

    return <View style={styles.screen}><ActivityIndicator size={'large'} color={Colors.primary}/></View>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default StartupScreen;
