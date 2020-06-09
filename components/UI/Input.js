import React, {useReducer, useEffect} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {...state, value: action.value, isValid: action.valid};
        case 'ON_BLUR':
            return {...state, touched: true};
        default:
            return {...state};
    }
};

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue? props.initialValue: '',
        isValid: props.initialValid,
        touched: false
    });

    const {id, onInputChange} = props;

    useEffect(()=>{
        if(inputState.touched){
            onInputChange(id,inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({type: 'INPUT_CHANGE', value: text, valid: isValid});
    };

    const lostFocusHandler = ()=> {
        dispatch({type: 'ON_BLUR'});
    }

    return (
        <View style={styles.form}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput {...props} style={styles.input} value={inputState.value} onChangeText={(text)=>textChangeHandler(text)} onBlur={lostFocusHandler}/>
            {!inputState.isValid&&inputState.touched&&<View style={styles.errorContainer}><Text style={styles.errorTxt}>{props.errorText}</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    errorContainer: {
        marginVertical: 5
    },
    errorTxt: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 14
    }
});

export default Input;
