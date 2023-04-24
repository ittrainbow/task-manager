import { call, cancel, delay, fork, put, select, take } from 'redux-saga/effects'

import { LISTENER_START, LISTENER_STOP, UPDATE_FROM_LISTENER } from '../types'
import { listenToFirebase } from '../../api/firebase'
import { selectTask } from '../selectors'

function* listenFirebase({ payload }) {
  const { id, time } = payload
  const { selectedTaskId } = yield select(selectTask)
  while (selectedTaskId === id) {
    yield delay(15000)
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
