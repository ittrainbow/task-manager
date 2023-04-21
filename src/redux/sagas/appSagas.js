import { takeEvery } from 'redux-saga/effects'
import { SET_LOADING } from '../types'

function* setLoading({ payload }) {
  yield
}

export function* appSagas() {
  yield takeEvery(SET_LOADING, setLoading)
}
