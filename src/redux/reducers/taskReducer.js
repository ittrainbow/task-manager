import {
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SELECT_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from '../types'

const initialState = {
  tasks: [],
  error: null,
  newTaskId: 0,
  newTask: false,
  yourTask: false,
  taskInProgress: false,
  selectedTaskId: null
}

export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS_SUCCESS:
      const { tasks } = payload
      const newTaskId = tasks.map((task) => task.id).sort((a, b) => b - a)[0] + 1
      
      return {
        ...state,
        tasks,
        newTaskId
      }

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        ...payload
      }

    case SELECT_TASK: {
      return {
        ...state,
        selectedTaskId: payload
      }
    }

    case SAVE_TASK_SUCCESS:
      const newTasks = state.tasks
      const taskExists = newTasks.map((task) => task.id).indexOf(payload.id)
      taskExists > -1 ? (newTasks[taskExists] = payload.task) : newTasks.push(payload.task)

      return {
        ...state,
        error: null,
        tasks: newTasks,
        newTaskId: state.newTaskId + 1
      }

    case SAVE_TASK_FAILURE:
      return {
        ...state,
        ...payload
      }

    case DELETE_TASK_SUCCESS:
      const { id } = payload
      const filteredTasks = state.tasks.filter((task) => task.id !== id)

      return {
        ...state,
        tasks: filteredTasks,
        selectedTaskId: null
      }

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}
