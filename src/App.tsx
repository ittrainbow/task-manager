import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Router } from './router/Router'
import { useUnsavedIDs } from './hooks'
import { getLocalStorage, setLocalStorage } from './api/userApi'
import { useMutation } from '@apollo/client'
import { TOKEN_MUTATION } from './api/mutations'
import { LOGIN_SUCCESS } from './redux/types'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useUnsavedIDs()

  const [tokenMutation, { data }] = useMutation(TOKEN_MUTATION)

  useEffect(() => {
    const { token } = getLocalStorage()
    if (token) {
      console.log(2, token)
      const data = tokenMutation({ variables: { token } })
      console.log(3, data)
    }
    // dispatch({ type: TOKEN_AUTH })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (data) {
      if (data?.userAuth._id) {
        setLocalStorage(data.userAuth.token)
        dispatch({ type: LOGIN_SUCCESS, payload: data.userAuth })
      }
    }
  }, [data])

  return <Router />
}

export default App
