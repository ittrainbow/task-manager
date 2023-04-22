import { takeEvery, put, call } from 'redux-saga/effects'

import { writeNameToFirestore } from '../../api/firebase'
import {
  UPDATE_USER_ATTEMPT,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS
} from '../types'
import { setLoadingFalseSaga, setLoadingTrueSaga } from './appSagas'

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
  yield call(setLoadingTrueSaga)
  console.log(1)
  yield call(writeNameToFS, { payload })
  console.log(2)
  yield call(setLoadingFalseSaga)
}

export function* userSagas() {
  yield takeEvery(UPDATE_USER_ATTEMPT, writeName)
}
