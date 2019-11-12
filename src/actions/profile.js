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
        console.log('******* the profile ', res.data);
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
