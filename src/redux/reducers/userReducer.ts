import { TActionProps } from '../../interfaces'
import * as TYPES from '../types'

const initialState = {
  name: null,
  email: null,
  _id: null,
  error: null,
  token: null
}

export const userReducer = (state = initialState, action: TActionProps) => {
  const { type, payload } = action

  switch (type) {
    case TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        name: payload.name
      }

    case TYPES.LOGOUT:
      return initialState

    default:
      return state
  }
}
