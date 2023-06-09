import { Task } from "../interfaces"

export const selectTask = (store: any) => store.task
export const selectApp = (store: any) => store.app
export const selectUser = (store: any) => store.user
export const selectLoading = (store: any) => store.app.loading
export const selectCurrentTask = (store: any) =>
  store.task.tasks.find((task: Task) => task.id === store.task.selectedTaskId)
