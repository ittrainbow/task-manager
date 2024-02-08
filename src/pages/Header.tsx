import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gotUser, selectApp, selectUser } from '../redux/selectors'
import { clearLocalStorage } from '../helpers'
import { CommentsAlert, Button } from '../UI'
import * as TYPES from '../redux/types'

export const HeaderTab = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(gotUser)
  const { name } = useSelector(selectUser)
  const { loading } = useSelector(selectApp)

  const tasksHandler = () => {
    dispatch({ type: TYPES.SELECT_TASK })
    navigate('/')
  }

  const taskNewHandler = () => {
    dispatch({ type: TYPES.SELECT_TASK_NEW })
    navigate('/newtask')
  }

  const dashboardHandler = () => {
    dispatch({ type: TYPES.SET_SELECTED_TAB, payload: { tabId: 2 } })
    navigate('/dashboard')
  }

  const logoutHandler = () => {
    if (user) {
      dispatch({ type: TYPES.LOGOUT_SUCCESS })
      clearLocalStorage()
    }
    navigate('/login')
  }

  const authButton = user ? 'Logout' : 'Login'

  return (
    <div className="header__container">
      <div className="flexrow">
        <Button onClick={tasksHandler} label="Tasks" width={110} nonUser={true} />
        <Button onClick={taskNewHandler} label="New Task" width={110} />
        <Button onClick={dashboardHandler} label="Dashboard" width={110} />
      </div>
      <CommentsAlert />
      <div className="flexrow">
        {!loading && <div className="header__greeting">{user && `Welcome, ${name}`}</div>}
        <Button onClick={logoutHandler} label={authButton} width={110} nonUser={true} />
      </div>
    </div>
  )
}
