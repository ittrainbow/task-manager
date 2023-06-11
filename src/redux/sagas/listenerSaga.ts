import { call, delay, fork, put, select, take } from 'redux-saga/effects'
import * as Effects from "redux-saga/effects"

import { LISTENER_START, LISTENER_STOP, UPDATE_FROM_LISTENER } from '../types'
import { listenToFirebase } from '../../api/firebase'
import { selectTask } from '../selectors'
import { Task } from '../../interfaces'

type ListenerPayload = {
  time: number
  id: number
}

type ListenerAction = {
  type: string
  payload: ListenerPayload
}

function* listenFirebase(payload: ListenerPayload) {
  const { time } = payload
  const { newTask } = yield select(selectTask)
  while (!newTask) {
    yield delay(10000)
    try {
      const task: Task = yield call(listenToFirebase, payload)

      if (task.lastmodified > time)
        yield put({
          type: UPDATE_FROM_LISTENER,
          payload: task
        })
    } catch (error: unknown) {
      console.error(error)
      alert('Task was not found on server, check your internet connection')
    }
  }
}

const cancel: any = Effects.cancel

export function* listenerSaga() {
  while (true) {
    const action: ListenerAction = yield take(LISTENER_START)
    const task: Task = yield fork(listenFirebase, action.payload)
    yield take(LISTENER_STOP)
    yield cancel(task)
  }
}
