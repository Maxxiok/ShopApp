import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE= 'AUTHENTICATE';
export const LOGOUT= 'LOGOUT';
export const SET_AUTO_LOGIN='SET_AUTO_LOGIN';

let timer;

export const authenticate = (userId, token, expirTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };

}

export const setTryAutologin = () => {
    return {type: SET_AUTO_LOGIN};
};

export const signUp = (email, password) => {
    return (async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1hW_xS2qA5dSxECwIXAIVwOmA2X4javA',
            {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: email, password: password, returnSecureToken: true})});

        const resData = await res.json();

        if(!res.ok) {
            throw new Error(resData.error.message.replace('_',' '));
        }

        dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn*1000));
        const expDate =  new Date(new Date().getTime()+ (+resData.expiresIn*1000));
        saveDataTOStorage(resData.idToken, resData.localId, expDate);

    });
};

export const logIn = (email, password) => {
    return (async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1hW_xS2qA5dSxECwIXAIVwOmA2X4javA',
            {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: email, password: password, returnSecureToken: true})});

        const resData = await res.json();

        if(!res.ok) {
            throw new Error(resData.error.message.replace('_',' '));
        }

        dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn*1000));
        const expDate =  new Date(new Date().getTime()+ (+resData.expiresIn*1000));
        saveDataTOStorage(resData.idToken, resData.localId, expDate);

    });
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT};
};

const setLogoutTimer = expirTime => {
    return dispatch => {
        timer =setTimeout(()=>{
            dispatch(logout());
        }, expirTime);
    };
};

const clearLogoutTimer = ()=> {
    if(timer){
        clearTimeout(timer);
    }
};

const saveDataTOStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({token, userId, expiryDate: expDate.toISOString()}));
};
