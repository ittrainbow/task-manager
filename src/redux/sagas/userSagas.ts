import { takeEvery, put, call } from 'redux-saga/effects'

import { UPDATE_USER_SUCCESS, UPDATE_USER, SET_ERROR } from '../types'
import { TAction, TUserUpdate } from '../../interfaces'
import { update } from '../../api/userApi'

function* updateUserSaga(action: TAction<TUserUpdate>) {
  try {
    const { payload } = action
    yield call(update, payload)
    yield put({ type: UPDATE_USER_SUCCESS, payload })
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: SET_ERROR, payload: error.message })
    }
  }
}

export function* userSagas() {
  yield takeEvery(UPDATE_USER, updateUserSaga)
}
