import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { TOKEN_AUTH } from './redux/types'
import { Router } from './router/Router'
import { useUnsavedIDs } from './hooks'

const App = () => {
  const dispatch = useDispatch()

  useUnsavedIDs()

  useEffect(() => {
    dispatch({ type: TOKEN_AUTH })
    // eslint-disable-next-line
  }, [])

  return <Router />
}

export default App
