import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { INIT_APP, LOGIN_SUCCESS } from './redux/types'
import { auth } from './db/firebase'

const App = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { loggedIn } = useSelector((store) => store.user)

  useEffect(() => {
    if (user && !loggedIn) {
      const { uid, displayName: name, email } = user
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { uid, name, email }
      })
    } 
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (loggedIn) {
      const { uid } = user
      dispatch({
        type: INIT_APP,
        payload: { uid }
      })
    } 
    // eslint-disable-next-line
  }, [loggedIn])

  return <Router />
}

export default App
