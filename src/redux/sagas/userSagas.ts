import { takeEvery, put } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'

import { writeNameToFirestore } from '../../api/firebase'
import {
  UPDATE_USERLIST,
  UPDATE_USER_ATTEMPT,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS
} from '../types'
import { setLoadingFalseSaga, setLoadingTrueSaga } from './appSagas'

const call: any = Effects.call

type UserPayload = {
  name: string
  uid: string
}

type WriteNameAction = {
  type: string
  payload: UserPayload
}

function* writeNameToFS(payload: UserPayload) {
  console.log(1, payload)
  try {
    yield call(writeNameToFirestore, payload)
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload
    })
    yield put({
      type: UPDATE_USERLIST,
      payload
    })
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.message }
      })
  }
}
function* writeName(action: WriteNameAction) {
  const { payload } = action
  yield call(setLoadingTrueSaga)
  yield call(writeNameToFS, payload)
  yield call(setLoadingFalseSaga)
}

export function* userSagas() {
  yield takeEvery(UPDATE_USER_ATTEMPT, writeName)
}
