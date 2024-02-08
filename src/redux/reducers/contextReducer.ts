import { TActionProps, TContextStore } from '../../interfaces'
import * as TYPES from '../types'

const initialState: TContextStore = {
  selectedTab: 0,
  assigned: null,
  status: 'new',
  newComments: {},
  unsavedTaskIDs: []
}

export const contextReducer = (state = initialState, action: TActionProps) => {
  const { type, payload } = action

  switch (type) {
    case TYPES.SELECT_TASK:
      return { ...state, selectedTab: 0 }

    case TYPES.SELECT_TASK_NEW:
      return { ...state, selectedTab: 1 }

    case TYPES.SET_SELECTED_TAB:
      return { ...state, selectedTab: payload.tabId }

    case TYPES.SET_ASSIGNED:
      return { ...state, assigned: payload.assigned }

    case TYPES.SET_STATUS:
      return { ...state, status: payload.status }

    case TYPES.SET_TEMP_COMMENT:
      const taskComments = { ...state.newComments[payload.selectedTaskId] } || {}
      taskComments.comment = payload.value
      const updateComments = structuredClone(state.newComments) || {}
      updateComments[payload.selectedTaskId] = taskComments
      return { ...state, newComments: updateComments }

    case TYPES.ADD_TEMP_COMMENT:
      const tempComments = structuredClone(state.newComments[payload.selectedTaskId]) || {}
      if (!tempComments.hasOwnProperty('comments')) tempComments.comments = []
      tempComments.comments.push(state.newComments[payload.selectedTaskId]?.comment)
      tempComments.comment = ''
      const workComments = structuredClone(state.newComments) || {}
      workComments[payload.selectedTaskId] = tempComments
      return { ...state, newComments: workComments }

    case TYPES.CREATE_TASK_SUCCESS:
      return { ...state, selectedTab: 0 }

    case TYPES.UPDATE_TASK_SUCCESS:
      const savedComments = structuredClone(state.newComments)
      delete savedComments[payload._id]
      return { ...state, newComments: savedComments }

    case TYPES.SET_UNSAVED_TASKS:
      return { ...state, unsavedTaskIDs: payload.IDs }

    case TYPES.REMOVE_TEMP_COMMENT:
      const commentsArray = structuredClone(state.newComments[payload.selectedTaskId].comments)
      commentsArray.splice(payload.index, 1)
      const modifiedComments = structuredClone(state.newComments)
      modifiedComments[payload.selectedTaskId].comments = commentsArray
      return { ...state, newComments: modifiedComments }

    default:
      return state
  }
}
