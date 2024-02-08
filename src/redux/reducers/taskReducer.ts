import { TActionProps, TTask, TTaskStore } from '../../interfaces'
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
    case TYPES.CREATE_TASK_SUCCESS: {
      const { _id } = payload
      const tasks = structuredClone(state.tasks)
      tasks[_id] = payload

      return { ...state, tasks, selectedTaskId: _id, newTask: false }
    }

    case TYPES.FETCH_TASKS_SUCCESS: {
      const tasks: Record<string, TTask> = {}
      payload.forEach((task: TTask) => (tasks[task._id] = task))

      return { ...state, tasks }
    }

    case TYPES.UPDATE_TASK_SUCCESS: {
      const tasks = structuredClone(state.tasks)
      const { _id } = payload
      tasks[_id] = { ...tasks[_id], ...payload }

      return { ...state, tasks }
    }

    case TYPES.DELETE_TASK_SUCCESS: {
      const tasks = structuredClone(state.tasks)
      delete tasks[payload]

      return { ...state, tasks, selectedTaskId: '' }
    }

    case TYPES.SELECT_TASK_NEW:
      return { ...state, newTask: true }

    case TYPES.SELECT_TASK: {
      return { ...state, selectedTaskId: payload?.selectedTaskId || '', newTask: false }
    }

    case TYPES.SET_TASK_SORT:
      return { ...state, taskSort: payload.taskSort }

    default:
      return state
  }
}
