import { takeEvery, call, delay, put, select } from 'redux-saga/effects'

import { LISTENER, UPDATE_FROM_LISTENER } from '../types'
import { listenToFirebase } from '../../api/firebase'

function* listenFirebase({ payload }) {
  const { id, time } = payload
  let outdated = false
  const { selectedTaskId } = yield select((store) => store.task)
  while (!outdated) {
    if (selectedTaskId === id) {
      const task = yield call(listenToFirebase, payload)
      const { lastmodified } = task
      outdated = lastmodified > time

      yield put({
        type: UPDATE_FROM_LISTENER,
        payload: task
      })
      yield delay(1000000)
    }
  }
}

export function* listenerSaga() {
  yield takeEvery(LISTENER, listenFirebase)
}
