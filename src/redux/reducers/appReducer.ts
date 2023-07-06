import { ActionProps, IUser } from '../../interfaces'
import {
  FETCH_USERLIST_SUCCESS,
  FETCH_USERLIST_FAILURE,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  UPDATE_USERLIST
} from '../types'

const initialState = {
  loading: true,
  userlist: [],
  error: null
}

type UserListPayload = {
  userlist: IUser[]
  user: IUser
}

export const appReducer = (state = initialState, action: ActionProps) => {
  const type: string = action.type
  const { payload } = action

  switch (type) {
    case FETCH_USERLIST_SUCCESS:
      const userListPayload: UserListPayload = payload
      const userlist: IUser[] = userListPayload.userlist
      const { uid } = userListPayload.user
      const fetchOnSignUp: boolean = userlist.some((user) => {
        return user.uid === uid
      })

      !fetchOnSignUp && userlist.push(userListPayload.user)

      return {
        ...state,
        userlist
      }

    case FETCH_USERLIST_FAILURE:
      const error: string = payload

      return {
        ...state,
        error
      }

    case UPDATE_USERLIST:
      const getUser: number = state.userlist.map((user: IUser) => user.uid).indexOf(payload.uid)
      const newList: IUser[] = structuredClone(state.userlist)

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
