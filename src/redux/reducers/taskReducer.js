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
  SET_TASK_SORT,
  UPDATE_FROM_LISTENER
} from '../types'

const initialState = {
  tasks: [],
  error: null,
  newTaskId: 0,
  newTask: false,
  yourTask: false,
  taskInProgress: false,
  selectedTaskId: null,
  taskSort: 0,
  lastUpdate: null
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
      const newTasksSave = [...state.tasks]
      const taskIndex = newTasksSave.map((task) => task.id).indexOf(payload.id)
      newTasksSave[taskIndex] = {
        ...state.tasks[taskIndex],
        ...payload.task
      }

      return {
        ...state,
        error: null,
        tasks: newTasksSave
      }

    case SAVE_NEW_TASK_SUCCESS:
      const newTasksCreate = state.tasks
      newTasksCreate.push(payload.task)
      return {
        ...state,
        tasks: newTasksCreate,
        error: null,
        newTaskId: state.newTaskId + 1
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

    case UPDATE_FROM_LISTENER:
      const lastUpdate = new Date().getTime()
      const updateTasks = [...state.tasks]
      const updateIndex = updateTasks.map((task) => task.id).indexOf(payload.id)
      updateTasks[updateIndex] = payload
      return {
        ...state,
        tasks: updateTasks,
        lastUpdate
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
