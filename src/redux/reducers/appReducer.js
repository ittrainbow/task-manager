import {
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  UPDATE_USERLIST
} from '../types'

const initialState = {
  loading: true,
  userlist: null
}

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_USERLIST_SUCCESS:
      const { userlist, user } = payload
      const { uid, displayName: name, email } = user
      const fetchOnSignUp = userlist.some((user) => user.uid === uid)
      !fetchOnSignUp && userlist.push({ uid, name, email })

      return {
        ...state,
        userlist
      }

    case FETCH_USERLIST_FAILURE:
      return {
        ...state,
        ...payload
      }

    case UPDATE_USERLIST:
      const getUser = state.userlist.map(user => user.uid).indexOf(payload.uid)
      const newList = [...state.userlist]
      newList[getUser] = payload
      return {
        ...state,
        userlist: newList
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
