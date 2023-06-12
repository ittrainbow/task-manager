import { Task, User } from '../interfaces'

type Store = {
  app: {
    loading: boolean
    userlist: User[]
  }
  task: {
    error: string | null
    lastUpdate: number | null
    newTask: boolean
    selectedTaskId: number
    taskInProgress: boolean
    taskSort: string
    tasks: Task[]
    id: number
    yourTask: boolean
  }
  user: {
    email: string
    name: string
    uid: string
    error: string | null
  }
}

export const selectTask = (store: Store) => store.task
export const selectApp = (store: Store) => store.app
export const selectUser = (store: Store) => store.user
export const selectLoading = (store: Store) => store.app.loading
export const selectCurrentTask = (store: Store) =>
  store.task.tasks.find((task: Task) => task.id === store.task.selectedTaskId)
