import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db/firebase'
import { Login, Dashboard } from './auth'
import { useSelector } from 'react-redux'
import { Loader } from '../UI'

export const Home = () => {
  const [user, loading] = useAuthState(auth)
  const appLoading = useSelector((store) => store.app.loading)

  return loading ? <Loader /> : user ? appLoading ? <Loader /> : <Dashboard /> : <Login />
}
