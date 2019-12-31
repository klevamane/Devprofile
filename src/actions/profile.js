import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
import setAuthenticationToken from "../utils/setAuthenticationToken";

export const getCurrentProfile = () => async dispatch => {
  if (localStorage.devprofiletkn) {
    setAuthenticationToken(localStorage.devprofiletkn);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/v1/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const alertMsg = edit ? "Profile Saved" : "Profile Updated";
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      "http://localhost:5000/api/v1/profile",
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile Updated" : alertMsg, "success"));
    if (!edit) {
      // redirect with history
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      const errorsArr = Object.values(errors);
      errorsArr.forEach(error => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      "http://localhost:5000/api/v1/profile/experience",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Experience added", "success"));
    // redirect with history
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      const errorsArr = Object.values(errors);
      errorsArr.forEach(error => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      "http://localhost:5000/api/v1/profile/education",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Education added", "success"));
    // redirect with history
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      const errorsArr = Object.values(errors);
      errorsArr.forEach(error => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE EXPERIENCE
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
         dispatch(setAlert('Experience deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}

// DELETE EDUCATION
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
         dispatch(setAlert('Education deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}