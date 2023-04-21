import { spawn, all } from 'redux-saga/effects'

import { userSagas } from './userSagas'
import { initSagas } from './initSagas'
import { taskSagas } from './taskSagas'
import { appSagas } from './appSagas'

export function* rootSaga() {
  const sagas = [userSagas, initSagas, taskSagas, appSagas]

  yield all(sagas.map((saga) => spawn(saga)))
}
