import { delay, fork, put, select, take, call } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'

import { LISTENER_START, LISTENER_STOP, UPDATE_FROM_LISTENER } from '../types'
import { TAction, TTask } from '../../interfaces'
import { selectTask } from '../selectors'
import { getOne } from '../../api/taskApi'

type ListenerAction = {
  selectedTaskId: string
  time: number
  snackTrigger: () => void
}

function* listenToDB(action: TAction<ListenerAction>) {
  const { selectedTaskId, time, snackTrigger } = action.payload
  const { newTask } = yield select(selectTask)
  while (!newTask) {
    yield delay(15000)
    try {
      const task: TTask = yield call(getOne, selectedTaskId)
      if (task.modified > time) {
        yield put({ type: UPDATE_FROM_LISTENER, payload: task })
        yield call(snackTrigger)
      }
    } catch (error: unknown) {
      console.error(error)
      alert('Task was not found on server, check your internet connection')
    }
  }
}

const cancel: Function = Effects.cancel

export function* listenerSaga() {
  while (true) {
    const action: TAction<ListenerAction> = yield take(LISTENER_START)
    const task: TTask = yield fork(listenToDB, action)
    yield take(LISTENER_STOP)
    yield cancel(task)
  }
}
