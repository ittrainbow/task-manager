import { takeEvery } from 'redux-saga/effects'
import { SET_LOADING, SET_LOADING_TRUE, SET_LOADING_FALSE } from '../types'

function* setLoading({ payload }) {
  console.log('set loading')
  // const type = 
  // yield put({
  //   type:
  // })
}

export function* appSagas() {
  yield takeEvery(SET_LOADING, setLoading)
}
