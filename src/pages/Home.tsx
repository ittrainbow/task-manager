import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { Login } from './auth'
import { Loader } from '../UI'
import { Task, TaskList } from './tasks'
import { selectLoading } from '../redux/selectors'

export const Home = () => {
  const [user, loading] = useAuthState(auth)
  const appLoading = useSelector(selectLoading)

  return (
    <div className="taskpage-container">
      {loading || (user && appLoading) ? (
        <Loader />
      ) : user && !appLoading ? (
        <>
          <TaskList />
          <Task />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
