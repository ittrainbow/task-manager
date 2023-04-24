import {
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  SELECT_TASK,
  SELECT_TASK_NEW,
  SET_TASK_SORT,
  UPDATE_FROM_LISTENER
} from '../types'

const initialState = {
  tasks: [],
  error: null,
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
      const lastTaskFromFetch = payload.tasks.map((task) => task.id).sort((a, b) => b - a)[0]
      const selectedTaskId = payload.lastTaskId || lastTaskFromFetch
      return {
        ...state,
        tasks: payload.tasks,
        selectedTaskId
      }

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: payload.error
      }

    case SELECT_TASK_NEW:
      return {
        ...state,
        newTask: true
      }

    case SELECT_TASK: {
      return {
        ...state,
        selectedTaskId: payload,
        newTask: false
      }
    }

    case SAVE_TASK_SUCCESS:
      const taskSave = [...state.tasks]
      const taskIndex = taskSave.map((task) => task.id).indexOf(payload.task.id)
      const newTask = taskIndex === -1

      switch (newTask) {
        case true:
          taskSave.push(payload.task)
          break
        case false:
          taskSave[taskIndex] = { ...taskSave[taskIndex], ...payload.task }
          break
        default:
          break
      }

      return {
        ...state,
        error: null,
        tasks: taskSave,
        selectedTaskId: newTask ? payload.task.id : taskSave[taskIndex].id,
        newTask: false
      }

    case SAVE_TASK_FAILURE:
      return {
        ...state,
        error: payload.error
      }

    case DELETE_TASK_SUCCESS:
      const filteredTasks = state.tasks.filter((task) => task.id !== payload.id)

      return {
        ...state,
        tasks: filteredTasks,
        selectedTaskId: null
      }

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        error: payload.error
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
