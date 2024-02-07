import { all, call, put } from 'redux-saga/effects'

import { getAllUsers } from '../../api/userApi'
import { TTask, TUser } from '../../interfaces'
import { getAllTasks } from '../../api/taskApi'
import * as TYPES from '../types'

function* fetchTasksSaga() {
  try {
    const response: TTask[] = yield call(getAllTasks)
    const obj: Record<string, TTask> = {}
    response.forEach((task: TTask) => (obj[task._id] = task))
    yield put({ type: TYPES.FETCH_TASKS_SUCCESS, payload: obj })
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: TYPES.SET_ERROR, payload: error.message })
    }
  }
}

// function* fetchUsersSaga() {
//   try {
//     const response: TUser[] = yield call(getAllUsers)
//     yield put({ type: TYPES.FETCH_USERS_SUCCESS, payload: response })
//   } catch (error) {
//     if (error instanceof Error) {
//       yield put({ type: TYPES.SET_ERROR, payload: error.message })
//     }
//   }
// }

// function* tokenAuthSaga() {
//   try {
//     const { token } = yield call(getLocalStorage)
//     const response: TUser = yield call(tokenAuth, token)
//     if (response.hasOwnProperty('_id')) {
//       yield put({ type: TYPES.LOGIN_SUCCESS, payload: response })
//       yield call(setLocalStorage, token)
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       yield put({ type: TYPES.SET_ERROR, payload: error.message })
//     }
//   }
// }

export function* initSaga() {
  yield all([fetchTasksSaga()])
  yield put({ type: TYPES.INIT_DONE })
}
