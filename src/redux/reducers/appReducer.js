import {
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE
} from '../types'

const initialState = {
  loading: true,
  userlist: null
}

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_USERLIST_SUCCESS:
      return {
        ...state,
        userlist: payload
      }

    case FETCH_USERLIST_FAILURE:
      return {
        ...state,
        error: payload.error
      }

    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true
      }

    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
