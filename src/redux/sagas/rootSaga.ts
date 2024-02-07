import { spawn, all } from 'redux-saga/effects'

import { initSaga } from './initSagas'
import { taskSagas } from './taskSagas'
import { listenerSaga } from './listenerSaga'
// import { authSagas } from './authSagas'

export function* rootSaga() {
  const sagas = [initSaga, taskSagas, listenerSaga]

  yield all(sagas.map((saga) => spawn(saga)))
}
