import {
  LOGIN_SUCCESS,
  UPDATE_USER_ATTEMPT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_FAILURE
} from '../types'

const initialState = {
  name: null,
  email: null,
  uid: null,
  error: null
}

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCESS:
      const { name, email, uid } = payload
      return {
        ...state,
        name,
        email,
        uid
      }

    case UPDATE_USER_ATTEMPT:
      return {
        ...state,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...payload,
      }

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        ...payload,
      }

    case FETCH_NAME_SUCCESS:
      return {
        ...state,
        ...payload
      }

    case FETCH_NAME_FAILURE:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}
