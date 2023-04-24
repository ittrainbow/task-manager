import { call, cancel, delay, fork, put, select, take } from 'redux-saga/effects'

import { LISTENER_START, LISTENER_STOP, UPDATE_FROM_LISTENER } from '../types'
import { listenToFirebase } from '../../api/firebase'

function* listenFirebase({ payload }) {
  const { id, time } = payload
  const { selectedTaskId } = yield select((store) => store.task)
  while (selectedTaskId === id) {
    yield delay(5000)
    const task = yield call(listenToFirebase, payload)

    if (task.lastmodified > time)
      yield put({
        type: UPDATE_FROM_LISTENER,
        payload: task
      })
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
