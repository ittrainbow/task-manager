import { spawn, all } from 'redux-saga/effects'

import { userSagas } from './userSagas'
import { initSagas } from './initSagas'
import { taskSagas } from './taskSagas'

export function* rootSaga() {
  const sagas = [userSagas, initSagas, taskSagas]

  yield all(sagas.map((saga) => spawn(saga)))
}
