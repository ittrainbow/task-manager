import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useUnsavedIDs } from './hooks'
import { getLocalStorage, setLocalStorage } from './helpers'
import { useMutation, useQuery } from '@apollo/client'
import { TOKEN_MUTATION } from './api/mutations'
import { TASKS_QUERY, USERS_QUERY } from './api/queries'
import { LOGIN_SUCCESS, FETCH_USERS_SUCCESS, FETCH_TASKS_SUCCESS, INIT_DONE } from './redux/types'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useUnsavedIDs()

  const [tokenMutation, { data: tokenData }] = useMutation(TOKEN_MUTATION)
  const { data: usersData } = useQuery(USERS_QUERY)
  const { data: tasksData } = useQuery(TASKS_QUERY)

  useEffect(() => {
    usersData && tasksData && dispatch({ type: INIT_DONE }) 
    // eslint-disable-next-line
  }, [usersData, tasksData])

  useEffect(() => {
    const { token } = getLocalStorage()
    if (token) tokenMutation({ variables: { token } }) 
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (tokenData?.userAuth._id) {
      setLocalStorage(tokenData.userAuth.token)
      dispatch({ type: LOGIN_SUCCESS, payload: tokenData.userAuth })
      navigate('/')
    } 
    // eslint-disable-next-line
  }, [tokenData])

  useEffect(() => {
    if (usersData) {
      const { users } = usersData?.getUsers
      dispatch({ type: FETCH_USERS_SUCCESS, payload: users })
    } 
    // eslint-disable-next-line
  }, [usersData])

  useEffect(() => {
    if (tasksData) {
      const { tasks } = tasksData?.getTasks
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: tasks })
    } 
    // eslint-disable-next-line
  }, [tasksData])

  return <></>
}

export default App
