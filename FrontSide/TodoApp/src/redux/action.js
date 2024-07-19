// actions.js
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  DELETE_PROFILE_REQUEST,
  LOGIN_REQUEST_CLEAR,
  REGISTER_REQUEST_CLEAR,
  GET_PROFILE_REQUEST_CLEAR,
  UPDATE_PROFILE_REQUEST_CLEAR,
  DELETE_PROFILE_REQUEST_CLEAR,
} from './actionTypes';

// Login Actions
export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginRequestclear = error => ({
  type: LOGIN_REQUEST_CLEAR,
  payload: error,
});

// Register Actions
export const registerRequest = userInfo => ({
  type: REGISTER_REQUEST,
  payload: userInfo,
});

export const registerRequestClear = error => ({
  type: REGISTER_REQUEST_CLEAR,
  payload: error,
});

// Profile Actions
export const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
});

export const getProfileRequestClear = error => ({
  type: GET_PROFILE_REQUEST_CLEAR,
  payload: error,
});

export const updateProfileRequest = profileData => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: profileData,
});

export const updateProfileRequestClear = profileData => ({
  type: UPDATE_PROFILE_REQUEST_CLEAR,
  payload: profileData,
});

export const deleteProfileRequest = () => ({
  type: DELETE_PROFILE_REQUEST,
});

export const deleteProfileRequestClear = () => ({
  type: DELETE_PROFILE_REQUEST_CLEAR,
});
