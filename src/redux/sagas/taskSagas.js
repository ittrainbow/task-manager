import { takeEvery, put, call } from 'redux-saga/effects'

import {
  DELETE_TASK_ATTEMPT,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_FAILURE,
  SAVE_TASK_SUCCESS
} from '../types'
import { writeTaskToFirestore, deleteTaskFromFirestore } from '../../api/firebase'
import { setLoadingFalseSaga, setLoadingTrueSaga } from './appSagas'

function* saveTaskSaga({ payload }) {
  const { cleanCommentsOnSave, task } = payload
  const { id } = task
  try {
    yield call(writeTaskToFirestore, task)
    yield put({
      type: SAVE_TASK_SUCCESS,
      payload
    })
    yield call(cleanCommentsOnSave, id)
  } catch (error) {
    yield put({
      type: SAVE_TASK_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload
  try {
    yield call(deleteTaskFromFirestore, id)
    yield put({
      type: DELETE_TASK_SUCCESS,
      payload
    })
  } catch (error) {
    yield put({
      type: DELETE_TASK_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* saveTask(action) {
  yield call(setLoadingTrueSaga)
  yield call(saveTaskSaga, action)
  yield call(setLoadingFalseSaga)
}

function* deleteTask(action) {
  yield call(setLoadingTrueSaga)
  yield call(deleteTaskSaga, action)
  yield call(setLoadingFalseSaga)
}

export function* taskSagas() {
  yield takeEvery(SAVE_TASK_ATTEMPT, saveTask)
  yield takeEvery(DELETE_TASK_ATTEMPT, deleteTask)
}
