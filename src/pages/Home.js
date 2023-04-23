import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db/firebase'
import { Login } from './auth'
import { useSelector } from 'react-redux'
import { Loader } from '../UI'
import { TaskPage } from './tasks'

export const Home = () => {
  const [user, loading] = useAuthState(auth)
  const appLoading = useSelector((store) => store.app.loading)

  return loading || (user && appLoading) ? (
    <Loader />
  ) : user && !appLoading ? (
    <TaskPage />
  ) : (
    <Login />
  )
}
