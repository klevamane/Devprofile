import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from '../actions/types';

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
            localStorage.removeItem('devprofiletkn');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                laoding: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                laoding: false,
            }
        
        default:
            return state;
    }
}
