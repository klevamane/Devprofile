import axios from 'axios';

import {REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from '../types';
import { setAlert } from '../alert'
import setAuthenticationToken from '../../utils/setAuthenticationToken';

export const loadUser = () => async dispatch => {
    if(localStorage.devprofiletkn) {
        setAuthenticationToken(localStorage.devprofiletkn);
    }
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/current');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        }) 
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register the user

export const register = ({ firstname, lastname, email, password, confirmpwd }) => async dispatch => {
    const configuration = {
        headers: {
            'Content-Type': 'application/json'
        } 
    }
    const data = JSON.stringify({firstname, lastname, email, password , confirmpwd});
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/register', data, configuration);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data;
        if(errors) {
            Object.keys(errors).forEach(errorKey => dispatch(setAlert(errors[errorKey], 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }

}

export const login = ({ email, password }) => async dispatch => {
    const configuration = {
        headers: {
            'Content-Type': 'application/json'
        } 
    }
    const data = JSON.stringify({ email, password });
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/login', data, configuration)
        console.log('response detatils login ', res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })
    }
    catch(err) {
        const errors = err.response.data;
        if(errors) {
            Object.keys(errors).forEach(errorKey => dispatch(setAlert(errors[errorKey], 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
