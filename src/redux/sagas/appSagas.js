import { put } from 'redux-saga/effects'
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../types'

export function* setLoadingTrueSaga() {
  yield put({
    type: SET_LOADING_TRUE
  })
}

export function* setLoadingFalseSaga() {
  yield put({
    type: SET_LOADING_FALSE
  })
}
