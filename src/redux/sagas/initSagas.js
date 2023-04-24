import { put, call, all, take } from 'redux-saga/effects'

import { fetchNameFromFirestore, fetchUserList, fetchTasks } from '../../api/firebase'
import { setLoadingFalseSaga } from './appSagas'
import {
  INIT,
  LOGIN_SUCCESS,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_FAILURE,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_SORT
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
      payload: { error: error.message }
    })
  }
}

function* fetchUserListSaga({ payload }) {
  try {
    const userlist = yield call(fetchUserList)
    yield put({
      type: FETCH_USERLIST_SUCCESS,
      payload: { userlist, user: payload }
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
    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: { tasks }
    })
  } catch (error) {
    yield put({
      type: FETCH_TASKS_FAILURE,
      payload: { error: error.message }
    })
  }
}

function* initTaskSort() {
  const taskSort = Number(localStorage.getItem('taskSort')) || 0
  yield put({
    type: SET_TASK_SORT,
    payload: taskSort
  })
}

export function* initSagas(action) {
  yield put({
    type: LOGIN_SUCCESS,
    payload: action.payload
  })
  yield call(initTaskSort)
  yield all([fetchNameSaga(action), fetchTasksSaga(action), fetchUserListSaga(action)])
  yield call(setLoadingFalseSaga)
}

export function* initSaga() {
  while (true) {
    const action = yield take(INIT)
    yield call(initSagas, action)
  }
}
