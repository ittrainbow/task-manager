import { takeEvery, put, call } from 'redux-saga/effects'

import {
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_FAILURE,
  SAVE_TASK_SUCCEED,
} from '../types'
import { writeTaskToFirestore } from '../../api/firebase'
import { setLoadingFalseSaga, setLoadingTrueSaga } from './appSagas'

function* saveNewTask({ payload }) {
  try {
    yield call(writeTaskToFirestore, payload)
    yield put({
      type: SAVE_TASK_SUCCEED,
      payload
    })
  } catch (error) {
    yield put({
      type: SAVE_TASK_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* saveTask({ payload }) {
  yield call(setLoadingTrueSaga)
  yield call(saveNewTask, { payload })
  yield call(setLoadingFalseSaga)
}

export function* taskSagas() {
  yield takeEvery(SAVE_TASK_ATTEMPT, saveTask)
}
