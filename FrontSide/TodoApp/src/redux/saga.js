// sagas.js
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
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
} from './actionTypes';

import axiosConfig from '../Helper/AxiosConfig';
import {End_Points} from '../Helper/Constants';

function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}
function* loginSaga(action) {
  try {
    const user = yield call(
      requestApi,
      'POST',
      End_Points.login,
      action.payload,
    );
    yield put({type: LOGIN_SUCCESS, payload: user});
  } catch (error) {
    yield put({type: LOGIN_FAILURE, payload: error});
  }
}

function* registerSaga(action) {
  try {
    const user = yield call(
      requestApi,
      'POST',
      End_Points.register,
      action.payload,
    );
    yield put({type: REGISTER_SUCCESS, payload: user});
  } catch (error) {
    yield put({type: REGISTER_FAILURE, payload: error});
  }
}

function* getProfileSaga() {
  try {
    const profile = yield call(requestApi, 'GET', End_Points.profile);
    yield put({type: GET_PROFILE_SUCCESS, payload: profile});
  } catch (error) {
    yield put({type: GET_PROFILE_FAILURE, payload: error.message});
  }
}

function* updateProfileSaga(action) {
  try {
    const profile = yield call(
      requestApi,
      'PUT',
      End_Points.profile,
      action.payload,
    );
    yield put({type: UPDATE_PROFILE_SUCCESS, payload: profile});
  } catch (error) {
    yield put({type: UPDATE_PROFILE_FAILURE, payload: error.message});
  }
}

function* deleteProfileSaga() {
  try {
    const profile = yield call(requestApi, 'DELETE', End_Points.profile);
    yield put({type: DELETE_PROFILE_SUCCESS, payload: profile});
  } catch (error) {
    yield put({type: DELETE_PROFILE_FAILURE, payload: error.message});
  }
}

export default function* rootAuthSaga() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(GET_PROFILE_REQUEST, getProfileSaga);
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga);
  yield takeEvery(DELETE_PROFILE_REQUEST, deleteProfileSaga);
}
