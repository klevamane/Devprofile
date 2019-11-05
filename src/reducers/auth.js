import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

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
            localStorage.removeItem('devprofiletkn');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        
        default:
            return state;
    }
}
