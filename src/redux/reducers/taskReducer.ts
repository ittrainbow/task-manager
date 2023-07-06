import { ActionProps, ITask } from '../../interfaces'
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
  taskSort: '3',
  lastUpdate: null
}

export const taskReducer = (state = initialState, action: ActionProps) => {
  const type: string = action.type
  const { payload } = action

  switch (type) {
    case FETCH_TASKS_SUCCESS:
      const tasks: ITask[] = payload.tasks
      const lastTaskFromFetchId: number = tasks.sort((a, b) => b.id - a.id)[0].id
      const selectedTaskId: number = payload.lastTaskId || lastTaskFromFetchId

      return {
        ...state,
        tasks,
        selectedTaskId
      }

    case SELECT_TASK_NEW:
      return {
        ...state,
        newTask: true
      }

    case SELECT_TASK: {
      const selectedTaskId: number = payload

      return {
        ...state,
        selectedTaskId,
        newTask: false
      }
    }

    case SAVE_TASK_SUCCESS:
      const taskSave: ITask[] = structuredClone(state.tasks)
      const taskIndex: number = taskSave.map((task) => task.id).indexOf(payload.task.id)
      const newTask: boolean = taskIndex === -1
      const selectedTaskSuccess: number = newTask ? payload.task.id : taskSave[taskIndex].id

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
        selectedTaskId: selectedTaskSuccess,
        newTask: false
      }

    case DELETE_TASK_SUCCESS:
      const deletingTaskId: number = payload.id
      const filteredTasks: ITask[] = state.tasks.filter((task: ITask) => task.id !== deletingTaskId)

      return {
        ...state,
        tasks: filteredTasks,
        selectedTaskId: null
      }

    case FETCH_TASKS_FAILURE:
    case DELETE_TASK_FAILURE:
    case SAVE_TASK_FAILURE:
      const error: string = payload

      return {
        ...state,
        error
      }

    case UPDATE_FROM_LISTENER:
      const lastUpdate: number = new Date().getTime()
      const updateTasks: ITask[] = [...state.tasks]
      const updateIndex: number = updateTasks.map((task: ITask) => task.id).indexOf(payload.id)

      updateTasks[updateIndex] = payload

      return {
        ...state,
        tasks: updateTasks,
        lastUpdate
      }

    case SET_TASK_SORT:
      const taskSort: string = payload

      localStorage.setItem('taskSort', taskSort)

      return {
        ...state,
        taskSort
      }

    default:
      return state
  }
}
