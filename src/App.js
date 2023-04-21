import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { INIT_APP, LOGIN_SUCCESS } from './redux/types'
import { auth } from './db/firebase'

const App = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const { uid, displayName: name, email } = user
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { uid, name, email }
      })
      dispatch({
        type: INIT_APP,
        payload: { uid }
      })
    }
    // eslint-disable-next-line
  }, [user])

  return <Router />
}

export default App
