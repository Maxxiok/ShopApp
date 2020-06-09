import {AUTHENTICATE, LOGOUT, SET_AUTO_LOGIN} from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
};

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {...state, token: action.token, userId: action.userId, didTryAutoLogin: true};
        case LOGOUT:
            return {...initialState, token: null, didTryAutoLogin: false};
        case SET_AUTO_LOGIN:
            return {...state, didTryAutoLogin: true};
        default:
            return {...state}
    }
};

export default authReducer;
