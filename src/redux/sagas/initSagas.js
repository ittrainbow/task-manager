import { put, call, take, all } from 'redux-saga/effects'

import { fetchNameFromFirestore, fetchUserList, fetchTasks } from '../../api/firebase'
import {
  INIT_APP,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_FAILURE,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASKS_NUMBER,
  SET_LOADING_FALSE
} from '../types'

function* fetchNameSaga({ payload }) {
  const { uid } = payload
  try {
    const name = yield call(fetchNameFromFirestore, uid)
    yield put({
      type: FETCH_NAME_SUCCESS,
      payload: { name }
    })
    yield put
  } catch (error) {
    yield put({
      type: FETCH_NAME_FAILURE,
      payload: { error }
    })
  }
}

function* fetchUserListSaga() {
  try {
    const userlist = yield call(fetchUserList)
    yield put({
      type: FETCH_USERLIST_SUCCESS,
      payload: userlist
    })
  } catch (error) {
    yield put({
      type: FETCH_USERLIST_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* fetchTasksSaga() {
  try {
    const tasks = yield call(fetchTasks)
    const newTaskId = tasks[tasks.length - 1].id + 1
    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: { tasks }
    })
    
    yield put({
      type: SET_TASKS_NUMBER,
      payload: { newTaskId }
    })
  } catch (error) {
    yield put({
      type: FETCH_TASKS_FAILURE,
      payload: { error: error.message }
    })
  }
}

export function* initSagas() {
  const action = yield take(INIT_APP)

  yield all([fetchNameSaga(action), fetchUserListSaga(), fetchTasksSaga()])
  yield put({
    type: SET_LOADING_FALSE
  })
}
