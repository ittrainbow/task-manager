import { takeEvery, put, call } from 'redux-saga/effects'

import { writeNameToFirestore } from '../../api/firebase'
import {
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  UPDATE_USER_ATTEMPT,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS
} from '../types'

function* writeNameToFS({ payload }) {
  try {
    yield call(writeNameToFirestore, payload)
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload
    })
  } catch (error) {
    yield put({
      type: UPDATE_USER_FAILURE,
      payload: { error }
    })
  }
}

function* writeName({ payload }) {
  yield put({
    type: SET_LOADING_TRUE
  })
  yield call(writeNameToFS, { payload })
  yield put({
    type: SET_LOADING_FALSE
  })
}

export function* userSagas() {
  yield takeEvery(UPDATE_USER_ATTEMPT, writeName)
}
