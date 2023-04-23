import {
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SELECT_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  SAVE_NEW_TASK_SUCCESS,
  SAVE_NEW_TASK_FAILURE,
  SET_TASK_SORT
} from '../types'

const initialState = {
  tasks: [],
  error: null,
  newTaskId: 0,
  newTask: false,
  yourTask: false,
  taskInProgress: false,
  selectedTaskId: null,
  taskSort: 0
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
      const newTasksSave = state.tasks
      const taskExists = newTasksSave.map((task) => task.id).indexOf(payload.id)
      taskExists > -1 ? (newTasksSave[taskExists] = payload.task) : newTasksSave.push(payload.task)

      return {
        ...state,
        error: null,
        tasks: newTasksSave,
        newTaskId: state.newTaskId + 1
      }

    case SAVE_NEW_TASK_SUCCESS:
      const newTasksCreate = state.tasks
      newTasksCreate.push(payload.task)
      return {
        ...state,
        tasks: newTasksCreate,
        newTaskId: payload.id + 1,
        selectedTaskId: payload.id
      }

    case SAVE_TASK_FAILURE:
      return {
        ...state,
        ...payload
      }

    case SAVE_NEW_TASK_FAILURE:
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

    case SET_TASK_SORT:
      localStorage.setItem('taskSort', payload)
      return {
        ...state,
        taskSort: payload
      }

    default:
      return state
  }
}
