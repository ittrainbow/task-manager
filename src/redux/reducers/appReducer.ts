import { TActionProps, TAppStore, TUser } from '../../interfaces'
import * as TYPES from '../types'

const initialState: TAppStore = {
  loading: true,
  userlist: [],
  error: null
}

export const appReducer = (state = initialState, action: TActionProps) => {
  const type: string = action.type
  const { payload } = action

  switch (type) {
    case TYPES.INIT_DONE:
    case TYPES.CREATE_TASK_SUCCESS:
    case TYPES.UPDATE_TASK_SUCCESS:
    case TYPES.DELETE_TASK_SUCCESS:
      return { ...state, loading: false }

    case TYPES.LOGIN_SUCCESS:
    case TYPES.SIGNUP_SUCCESS:
      delete payload.token
      const gotUser = state.userlist.find((user) => user.email === payload.email)
      const newUsers = gotUser ? state.userlist : state.userlist.concat(payload)
      return { ...state, loading: false, userlist: newUsers }

    case TYPES.UPDATE_USER_SUCCESS:
      const findUser = state.userlist.map((user: TUser) => user._id).indexOf(payload._id)
      const users: TUser[] = structuredClone(state.userlist)
      users[findUser].name = payload.name
      return { ...state, userlist: users, loading: false }

    case TYPES.FETCH_USERS_SUCCESS:
      const userlist = payload.map((el: TUser) => {
        const { name, email, _id } = el
        return { name, email, _id }
      })
      return { ...state, userlist }

    case TYPES.SET_ERROR:
      return { ...state, error: payload }

    default:
      return state
  }
}
