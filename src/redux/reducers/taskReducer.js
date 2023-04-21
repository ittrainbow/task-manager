import {
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_SUCCEED,
  SAVE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASKS_NUMBER,
  SELECT_TASK
} from '../types'

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  newTaskId: 0,
  newTask: false,
  yourTask: false,
  taskInProgress: false,
  task: null,
  selectedTaskId: null
}

export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TASKS_SUCCESS:
      const { uid } = payload
      const tasks = [...payload.tasks].filter((task) => {
        const { appointed, creator } = task
        return appointed === uid || creator === uid
      })
      
      return {
        ...state,
        tasks
      }

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false
      }

    case SET_TASKS_NUMBER:
      const { newTaskId } = payload
      return {
        ...state,
        newTaskId
      }

    case SELECT_TASK: {
      const { selectedTaskId } = payload
      return {
        ...state,
        selectedTaskId
      }
    }

    case SAVE_TASK_ATTEMPT:
      return {
        ...state,
        loading: true
      }

    case SAVE_TASK_SUCCEED:
      const newTasks = state.tasks
      const taskExists = newTasks.map((task) => task.id).indexOf(payload.id)
      taskExists > -1 ? (newTasks[taskExists] = payload.task) : newTasks.push(payload.task)

      return {
        ...state,
        loading: false,
        error: null,
        tasks: newTasks,
        newTaskId: state.newTaskId + 1
      }

    case SAVE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error
      }

    default:
      return state
  }
}
