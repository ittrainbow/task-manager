import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useUnsavedIDs } from './hooks'
import { getLocalStorage, setLocalStorage } from './api/userApi'
import { useMutation, useQuery } from '@apollo/client'
import { TOKEN_MUTATION } from './api/mutations'
import { USERS_QUERY } from './api/queries'
import { LOGIN_SUCCESS, FETCH_USERS_SUCCESS } from './redux/types'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useUnsavedIDs()

  const [tokenMutation, { data: tokenData }] = useMutation(TOKEN_MUTATION)
  const { data: usersData } = useQuery(USERS_QUERY)

  useEffect(() => {
    const { token } = getLocalStorage()
    if (token) tokenMutation({ variables: { token } })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (tokenData?.userAuth._id) {
      setLocalStorage(tokenData.userAuth.token)
      dispatch({ type: LOGIN_SUCCESS, payload: tokenData.userAuth })
      navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [tokenData])

  useEffect(() => {
    if (usersData && usersData?.getUsers?.users?.length) {
      const { users } = usersData?.getUsers
      users.length && dispatch({ type: FETCH_USERS_SUCCESS, payload: users })
    }
  }, [usersData])

  return <></>
}

export default App
