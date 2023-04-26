import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { Login } from './auth'
import { Loader } from '../UI'
import { Task, TaskList, TaskNew } from './tasks'
import { selectLoading, selectTask } from '../redux/selectors'

export const Home = () => {
  const [user, loading] = useAuthState(auth)
  const appLoading = useSelector(selectLoading)
  const { newTask } = useSelector(selectTask)

  return (
    <div className="taskpage-container">
      {loading || (user && appLoading) ? (
        <Loader />
      ) : user && !appLoading ? (
        <>
          <TaskList />
          {newTask ? <TaskNew /> : <Task />}
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
