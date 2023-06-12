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
import { Task } from '../../interfaces'

type SaveTaskPayload = {
  task: Task
  cleanCommentsOnSave: (id: number) => void
}

type SaveTaskAction = {
  type: string
  payload: SaveTaskPayload
}

type DeleteTaskPayload = {
  id: number
}

type DeleteTaskAction = {
  type: string
  payload: DeleteTaskPayload
}

function* saveTaskSaga(payload: SaveTaskPayload) {
  const { cleanCommentsOnSave, task } = payload

  try {
    yield call(writeTaskToFirestore, task)
    yield put({
      type: SAVE_TASK_SUCCESS,
      payload
    })
    yield call(cleanCommentsOnSave, task.id)
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SAVE_TASK_FAILURE,
        payload: error.message
      })
  }
}

function* deleteTaskSaga(payload: DeleteTaskPayload) {
  try {
    yield call(deleteTaskFromFirestore, payload.id)
    yield put({
      type: DELETE_TASK_SUCCESS,
      payload
    })
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: DELETE_TASK_FAILURE,
        payload: error.message
      })
  }
}

function* saveTask(action: SaveTaskAction) {
  yield call(setLoadingTrueSaga)
  yield call(saveTaskSaga, action.payload)
  yield call(setLoadingFalseSaga)
}

function* deleteTask(action: DeleteTaskAction) {
  yield call(setLoadingTrueSaga)
  yield call(deleteTaskSaga, action.payload)
  yield call(setLoadingFalseSaga)
}

export function* taskSagas() {
  yield takeEvery(SAVE_TASK_ATTEMPT, saveTask)
  yield takeEvery(DELETE_TASK_ATTEMPT, deleteTask)
}
