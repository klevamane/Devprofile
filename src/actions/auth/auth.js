import axios from 'axios';

import {REGISTER_FAIL, REGISTER_SUCCESS} from '../types';
import { setAlert } from '../alert'

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
