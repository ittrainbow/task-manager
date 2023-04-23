import { takeEvery, put, call } from 'redux-saga/effects'

import {
  DELETE_TASK_ATTEMPT,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_FAILURE,
  SAVE_TASK_SUCCESS,
  SAVE_NEW_TASK_ATTEMPT,
  SAVE_NEW_TASK_SUCCESS,
  SAVE_NEW_TASK_FAILURE
} from '../types'
import {
  writeTaskToFirestore,
  deleteTaskFromFirestore,
  fetchTasksNumbers
} from '../../api/firebase'
import { setLoadingFalseSaga, setLoadingTrueSaga } from './appSagas'

function* saveTaskSaga({ payload }) {
  try {
    yield call(writeTaskToFirestore, payload)
    yield put({
      type: SAVE_TASK_SUCCESS,
      payload
    })
  } catch (error) {
    yield put({
      type: SAVE_TASK_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* saveNewTaskSaga({ payload, numbers, lastNum }) {
  const { task } = payload
  const id = numbers.indexOf(task.id) > -1 ? lastNum + 1 : task.id
  try {
    yield call(writeTaskToFirestore, { id, task })
    yield put({
      type: SAVE_NEW_TASK_SUCCESS,
      payload: { id, task }
    })
  } catch (error) {
    yield put({
      type: SAVE_NEW_TASK_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* deleteTaskSaga({ payload }) {
  try {
    yield call(deleteTaskFromFirestore, payload)
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

function* saveNewTask({ payload }) {
  yield call(setLoadingTrueSaga)
  const [numbers, lastNum] = yield call(fetchTasksNumbers)
  yield call(saveNewTaskSaga, { payload, numbers, lastNum })
  yield call(setLoadingFalseSaga)
}

function* deleteTask(action) {
  yield call(setLoadingTrueSaga)
  yield call(deleteTaskSaga, action)
  yield call(setLoadingFalseSaga)
}

export function* taskSagas() {
  yield takeEvery(SAVE_TASK_ATTEMPT, saveTask)
  yield takeEvery(SAVE_NEW_TASK_ATTEMPT, saveNewTask)
  yield takeEvery(DELETE_TASK_ATTEMPT, deleteTask)
}
