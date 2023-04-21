import { takeEvery, put, call, select } from 'redux-saga/effects'

import {
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_FAILURE,
  SAVE_TASK_SUCCEED,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_TASK_IN_WORK,
  GET_TASK_IN_WORK
} from '../types'
import { writeTaskToFirestore } from '../../api/firebase'

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
  yield put({
    type: SET_LOADING_TRUE
  })
  yield call(saveNewTask, { payload })
  yield put({
    type: SET_LOADING_FALSE
  })
}

function* setTaskInWorkSaga({ payload }) {
  const { id, uid } = payload
  const { tasks } = yield select((store) => store.task)
  const task = tasks.filter((task) => task.id === id)[0]
  yield put({
    type: SET_TASK_IN_WORK,
    payload: { task, uid }
  })
}

export function* taskSagas() {
  yield takeEvery(SAVE_TASK_ATTEMPT, saveTask)
  yield takeEvery(GET_TASK_IN_WORK, setTaskInWorkSaga)
}
