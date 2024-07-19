// authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
  LOGIN_REQUEST_CLEAR,
  REGISTER_REQUEST_CLEAR,
  GET_PROFILE_REQUEST_CLEAR,
  UPDATE_PROFILE_REQUEST_CLEAR,
  DELETE_PROFILE_REQUEST_CLEAR,
} from './actionTypes';

const initialState = {
  user: null,
  registerUser: null,
  profile: null,
  profileUpdate: null,
  userDeleteDetails: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, user: null, loading: true, error: ''};
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload.message,
      };
    case LOGIN_REQUEST_CLEAR:
      return {
        ...state,
        loading: false,
        user: [],
        error: [],
      };

    case REGISTER_REQUEST:
      return {...state, loading: true, error: ''};
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerUser: action.payload.data,
        error: '',
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case REGISTER_REQUEST_CLEAR:
      return {
        ...state,
        loading: false,
        registerUser: [],
        error: [],
      };

    case GET_PROFILE_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileDetails: action.payload.data,
        error: '',
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case GET_PROFILE_REQUEST_CLEAR:
      return {
        ...state,
        loading: false,
        profileDetails: [],
        error: [],
      };

    case UPDATE_PROFILE_REQUEST:
      return {...state, loading: true, error: ''};
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileUpdate: action.payload.data,
        error: '',
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case UPDATE_PROFILE_REQUEST_CLEAR:
      return {
        ...state,
        loading: false,
        profileUpdate: [],
        error: [],
      };

    case DELETE_PROFILE_REQUEST:
      return {...state, loading: true, error: ''};
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userDeleteDetails: action.payload.data,
        error: '',
      };
    case DELETE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case DELETE_PROFILE_REQUEST_CLEAR:
      return {
        ...state,
        loading: false,
        userDeleteDetails: [],
        error: [],
      };

    default:
      return state;
  }
};

export default authReducer;
