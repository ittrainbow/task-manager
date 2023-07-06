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
      const { displayName: name, uid } = user
      dispatch({
        type: INIT_APP,
        payload: { name, uid }
      })
    } // eslint-disable-next-line
  }, [user])

  return <Router />
}

export default App
