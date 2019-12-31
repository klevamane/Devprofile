import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, ACCOUNT_DELETED } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,
    token: localStorage.getItem('devprofiletkn'),
    user: null
}

export default function(state = initialState, action) {
    const { payload, type } = action;
    switch(type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('devprofiletkn', payload);
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:        
            localStorage.removeItem('devprofiletkn');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('devprofiletkn', payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false,
            }
        default:
            return state;
    }
}
