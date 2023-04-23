import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { INIT } from './redux/types'
import { auth } from './db/firebase'

const App = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      console.log(111, user)
      dispatch({
        type: INIT,
        payload: user
      })
    }
  }, [user, dispatch])

  return <Router />
}

export default App
