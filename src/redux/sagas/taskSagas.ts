import { call, put, select, takeEvery } from 'redux-saga/effects'

import { TAction, TTaskUpdate, TTaskCreate, TCreateTaskResponse, TUpdateTaskResponse } from '../../interfaces'
import { create, update, remove } from '../../api/taskApi'
import { selectTask } from '../selectors'
import * as TYPES from '../types'

function* createTaskSaga(action: TAction<TTaskCreate>) {
  const { payload } = action
  try {
    const response: TCreateTaskResponse = yield call(create, payload)
    const createdTask = { ...payload, _id: response.insertedId, created: response.time, modified: response.time }
    yield put({ type: TYPES.CREATE_TASK_SUCCESS, payload: createdTask })
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: TYPES.SET_ERROR, payload: error.message })
    }
  }
}

function* updateTaskSaga(action: TAction<TTaskUpdate>) {
  try {
    const response: TUpdateTaskResponse = yield call(update, action.payload)
    const { modified } = response
    yield put({ type: TYPES.UPDATE_TASK_SUCCESS, payload: { ...action.payload, modified } })
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: TYPES.SET_ERROR, payload: error.message })
    }
  }
}

function* removeTaskSaga() {
  try {
    const { selectedTaskId } = yield select(selectTask)
    yield call(remove, selectedTaskId)
    yield put({ type: TYPES.REMOVE_TASK_SUCCESS, payload: { _id: selectedTaskId } })
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: TYPES.SET_ERROR, payload: error.message })
    }
  }
}

export function* taskSagas() {
  yield takeEvery(TYPES.CREATE_TASK, createTaskSaga)
  yield takeEvery(TYPES.UPDATE_TASK, updateTaskSaga)
  yield takeEvery(TYPES.REMOVE_TASK, removeTaskSaga)
}
