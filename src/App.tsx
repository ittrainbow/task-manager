import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { INIT_APP } from './redux/types'
import { auth } from './db/firebase'

const App = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      dispatch({
        type: INIT_APP,
        payload: user
      })
    }
  }, [user, dispatch])

  return <Router />
}

export default App
