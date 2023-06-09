import { call, cancel, delay, fork, put, select, take } from 'redux-saga/effects'

import { LISTENER_START, LISTENER_STOP, UPDATE_FROM_LISTENER } from '../types'
import { listenToFirebase } from '../../api/firebase'
import { selectTask } from '../selectors'

function* listenFirebase({ payload }) {
  const { time } = payload
  const { newTask } = yield select(selectTask)
  while (!newTask) {
    yield delay(5000)
    try {
      const task = yield call(listenToFirebase, payload)

      if (task.lastmodified > time)
        yield put({
          type: UPDATE_FROM_LISTENER,
          payload: task
        })
    } catch (error) {
      console.error(error)
      alert('Task was not found on server, check your internet connection')
    }
  }
}

export function* listenerSaga() {
  while (true) {
    const action = yield take(LISTENER_START)
    const task = yield fork(listenFirebase, action)
    yield take(LISTENER_STOP)
    yield cancel(task)
  }
}
