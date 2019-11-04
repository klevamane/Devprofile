import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


// Redux thunk enables us make use of dispatch
export const setAlert = (msg, alertType, timeout=4000) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { id, msg, alertType }
    });

    // remove the alert automatically after timeout seconds
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout)
}
