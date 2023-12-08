import { call, put, takeEvery } from 'redux-saga/effects'

import { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, SIGNUP, SIGNUP_SUCCESS, SET_ERROR } from '../types'
import { TAction, TLogin, TSignup, TUser } from '../../interfaces'
import { signup, login, setLocalStorage, clearLocalStorage } from '../../api/userApi'

function* signupSaga(action: TAction<TSignup>) {
  const { payload } = action
  try {
    const response: TUser = yield call(signup, payload)
    if (response.hasOwnProperty('token')) {
      const { token } = response
      yield put({ type: SIGNUP_SUCCESS, payload: response })
      yield call(setLocalStorage, token)
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: SET_ERROR, payload: error.message })
    }
  }
}

function* loginSaga(action: TAction<TLogin>) {
  const { payload } = action
  try {
    const response: TUser = yield call(login, payload)
    const { token } = response

    if (token !== 'undefined') {
      yield put({ type: LOGIN_SUCCESS, payload: response })
      yield call(setLocalStorage, token)
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: SET_ERROR, payload: error.message })
    }
  }
}

function* logoutSaga() {
  yield put({ type: LOGOUT_SUCCESS })
  yield call(clearLocalStorage)
}

export function* authSagas() {
  yield takeEvery(SIGNUP, signupSaga)
  yield takeEvery(LOGIN, loginSaga)
  yield takeEvery(LOGOUT, logoutSaga)
}
