import { put, call, all, take } from 'redux-saga/effects'

import { fetchNameFromFirestore, fetchUserList, fetchTasks } from '../../api/firebase'
import { setLoadingFalseSaga } from './appSagas'
import {
  INIT_APP,
  LOGIN_SUCCESS,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_FAILURE,
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_SORT
} from '../types'
import { ITask, IUser } from '../../interfaces'

function* fetchNameSaga(payload: IUser) {
  const { uid } = payload
  try {
    const name: string = yield call(fetchNameFromFirestore, uid)
    yield put({
      type: FETCH_NAME_SUCCESS,
      payload: name
    })
    yield put
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: FETCH_NAME_FAILURE,
        payload: { error: error.message }
      })
  }
}

function* fetchUserListSaga(payload: IUser) {
  try {
    const userlist: IUser[] = yield call(fetchUserList)
    yield put({
      type: FETCH_USERLIST_SUCCESS,
      payload: { userlist, user: payload }
    })
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: FETCH_USERLIST_FAILURE,
        payload: error.message
      })
  }
}

function* fetchTasksSaga() {
  try {
    const tasks: ITask[] = yield call(fetchTasks)
    const lastTaskId = Number(localStorage.getItem('lastTaskId'))

    yield put({
      type: FETCH_TASKS_SUCCESS,
      payload: { tasks, lastTaskId }
    })
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: FETCH_TASKS_FAILURE,
        payload: error.message
      })
  }
}

function* initTaskSort() {
  let taskSort = localStorage.getItem('taskSort')

  if (!taskSort || taskSort === '5') {
    taskSort = '4'
    localStorage.setItem('taskSort', taskSort)
  }
  yield put({
    type: SET_TASK_SORT,
    payload: taskSort
  })
}

export function* initSagas(payload: IUser) {
  yield put({
    type: LOGIN_SUCCESS,
    payload
  })
  yield call(initTaskSort)
  yield all([fetchNameSaga(payload), fetchTasksSaga(), fetchUserListSaga(payload)])
  yield call(setLoadingFalseSaga)
}

type InitAction = {
  type: string
  payload: IUser
}

export function* initSaga() {
  while (true) {
    const action: InitAction = yield take(INIT_APP)
    yield call(initSagas, action.payload)
  }
}
