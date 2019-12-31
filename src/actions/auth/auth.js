import axios from 'axios';

import {REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE} from '../types';
import { setAlert } from '../alert'

export const loadUser = () => async dispatch => {
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

export const register = ( newUser, history ) => async dispatch => {
    const {firstname, lastname, email, password, confirmpwd} = newUser;
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
        });
        history.push('/login');
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
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })

        loadUser();
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
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}
