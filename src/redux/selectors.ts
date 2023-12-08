import { TStore } from '../interfaces'

export const selectTask = (store: TStore) => store.task
export const selectContext = (store: TStore) => store.context
export const selectApp = (store: TStore) => store.app
export const selectUser = (store: TStore) => store.user
export const gotUser = (store: TStore) => !!store.user._id
export const selectLoading = (store: TStore) => store.app.loading
