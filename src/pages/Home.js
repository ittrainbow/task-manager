import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { Login } from './auth'
import { Loader } from '../UI'
import { TaskPage } from './tasks'
import { selectLoading } from '../redux/selectors'

export const Home = () => {
  const [user, loading] = useAuthState(auth)
  const appLoading = useSelector(selectLoading)

  return loading || (user && appLoading) ? (
    <Loader />
  ) : user && !appLoading ? (
    <TaskPage />
  ) : (
    <Login />
  )
}
