import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { appReducer as app } from './reducers/appReducer'
import { userReducer as user } from './reducers/userReducer'
import { taskReducer as task } from './reducers/taskReducer'
import { contextReducer as context } from './reducers/contextReducer'

export const store = configureStore({
  reducer: combineReducers({
    app,
    user,
    task,
    context
  }),
  devTools: process.env.NODE_ENV === 'development'
})
