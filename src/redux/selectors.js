export const selectTask = (store) => store.task
export const selectApp = (store) => store.app
export const selectUser = (store) => store.user
export const selectLoading = (store) => store.app.loading
export const selectCurrentTask = (store) =>
  store.task.tasks.filter((task) => task.id === store.task.selectedTaskId)[0]
