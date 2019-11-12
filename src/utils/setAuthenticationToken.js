import axios from 'axios';

const setAuthenticationToken = (token) => {
    if(token) {
        // axios.defaults.headers.common['x-auth-token'] = token;
        // Apply the token for every request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        // delete axios.defaults.headers.common['x-auth-token'];
        delete axios.defaults.headers.common['Authorization']; 
    }
}

export default setAuthenticationToken;
