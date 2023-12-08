import { spawn, all } from 'redux-saga/effects'

import { userSagas } from './userSagas'
import { initSaga } from './initSagas'
import { taskSagas } from './taskSagas'
import { listenerSaga } from './listenerSaga'
import { authSagas } from './authSagas'

export function* rootSaga() {
  const sagas = [userSagas, initSaga, taskSagas, listenerSaga, authSagas]

  yield all(sagas.map((saga) => spawn(saga)))
}
