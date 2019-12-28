import axios from 'axios';
import {setAlert} from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';
import setAuthenticationToken from '../utils/setAuthenticationToken';

export const getCurrentProfile = () => async dispatch => {
    if(localStorage.devprofiletkn) {
        setAuthenticationToken(localStorage.devprofiletkn);
      }
    try {
        const res = await axios.get('http://localhost:5000/api/v1/profile')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:  { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('http://localhost:5000/api/v1/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'))
        if(!edit) {
            // redirect with history  
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data;
        
        if(errors) {
            const errorsArr = Object.values(errors);
            errorsArr.forEach(error => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:  { msg: err.response.statusText, status: err.response.status }
        })
    }
}