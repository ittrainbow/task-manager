import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appReducer as app } from './reducers/appReducer'
import { userReducer as user } from './reducers/userReducer'
import { taskReducer as task } from './reducers/taskReducer'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware({})

export const store = configureStore({
  reducer: combineReducers({
    app,
    user,
    task
  }),
  middleware: [sagaMiddleware],
  // devTools: process.env.NODE_ENV === 'development'
})

sagaMiddleware.run(rootSaga)
