import { Action } from '../../interfaces'
import {
  LOGIN_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_FAILURE
} from '../types'

import { User } from '../../interfaces'

const initialState = {
  name: null,
  email: null,
  uid: null,
  error: null
}

export const userReducer = (state = initialState, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCESS:
    case UPDATE_USER_SUCCESS:
      const userPayload: User = payload
      
      return {
        ...state,
        ...userPayload
      }

    case FETCH_NAME_SUCCESS:
      const fetchNamePayload: string = payload

      return {
        ...state,
        name: fetchNamePayload
      }

    case FETCH_NAME_FAILURE:
    case UPDATE_USER_FAILURE:
      const error: string = payload

      return {
        ...state,
        error
      }

    default:
      return state
  }
}
