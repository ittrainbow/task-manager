import { TActionProps, TTaskStore } from '../../interfaces'
import * as TYPES from '../types'

const initialState: TTaskStore = {
  _id: '',
  tasks: {},
  newTask: false,
  selectedTaskId: '',
  taskSort: 'allOpen'
}

export const taskReducer = (state = initialState, action: TActionProps) => {
  const type: string = action.type
  const { payload } = action

  switch (type) {
    case TYPES.CREATE_TASK_SUCCESS:
      const newTasks = structuredClone(state.tasks)
      newTasks[payload._id] = payload
      return { ...state, tasks: newTasks, selectedTaskId: payload._id, newTask: false }

    case TYPES.FETCH_TASKS_SUCCESS:
      return { ...state, tasks: payload }

    case TYPES.UPDATE_TASK_SUCCESS:
      const updatedTasks = structuredClone(state.tasks)
      updatedTasks[payload._id] = { ...updatedTasks[payload._id], ...payload }
      return { ...state, tasks: updatedTasks }

    case TYPES.REMOVE_TASK_SUCCESS:
      const cleanedTasks = structuredClone(state.tasks)
      delete cleanedTasks[payload._id]
      return { ...state, tasks: cleanedTasks, selectedTaskId: '' }

    case TYPES.SELECT_TASK_NEW:
      return { ...state, newTask: true }

    case TYPES.SELECT_TASK: {
      return { ...state, selectedTaskId: payload?.selectedTaskId || '', newTask: false }
    }

    case TYPES.UPDATE_FROM_LISTENER:
      const tasks = structuredClone(state.tasks)
      tasks[payload._id] = payload
      return { ...state, tasks }

    case TYPES.SET_TASK_SORT:
      return { ...state, taskSort: payload.taskSort }

    default:
      return state
  }
}
