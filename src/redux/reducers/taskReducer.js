import {
  REMOVE_TASK_FROM_WORK,
  SET_TASK_IN_WORK,
  SET_NEW_TASK,
  TOGGLE_NEW_TASK,
  SAVE_TASK_ATTEMPT,
  SAVE_TASK_SUCCEED,
  SAVE_TASK_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  SET_TASK_CREATION,
  SET_TASKS_NUMBER,
  SELECT_TASK
} from '../types'
import { emptyTask } from '../../helpers'

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
    case SET_TASK_IN_WORK:
      const { task, uid } = payload
      const { creator } = task
      const yourTask = creator === uid
      return {
        ...state,
        task,
        yourTask,
        newTask: false
      }

    case SELECT_TASK: {
      const { id } = payload
      return {
        ...state,
        selectedTaskId: id
      }
    }

    case SET_NEW_TASK:
      const createTask = emptyTask(payload.uid)
      return {
        ...state,
        task: createTask,
        newTask: true
      }

    case REMOVE_TASK_FROM_WORK:
      return {
        ...state,
        task: null
      }

    case TOGGLE_NEW_TASK:
      console.log(payload)
      return {
        ...state,
        newTask: payload
      }

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        newTaskId: payload.newTaskId
      }

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: payload.error
      }

    case SET_TASK_CREATION:
      return {
        ...state,
        newTask: payload
      }

    case SET_TASKS_NUMBER:
      return {
        ...state,
        newTaskId: payload.newTaskId
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
      const { error } = payload
      return {
        ...state,
        loading: false,
        error
      }

    default:
      return state
  }
}
