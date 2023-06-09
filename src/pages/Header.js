import { useState, useEffect } from 'react'
import { Button } from '../UI'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db/firebase'
import { SELECT_TASK, SELECT_TASK_NEW } from '../redux/types'
import { logout } from '../db/auth.js'
import { CommentsAlert } from '../UI'
import { selectApp, selectTask, selectUser } from '../redux/selectors'
import { useAppContext } from '../context/Context'

const headerButtons = [
  { name: 'Tasks', path: '/', id: 0 },
  { name: 'New Task', path: '/newtask', id: 1 },
  { name: 'Dashboard', path: '/dashboard', id: 2 }
]

export const HeaderTab = () => {
  const { selectedTab, setSelectedTab, newComments, gotNewComments } = useAppContext()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedTaskId } = useSelector(selectTask)
  const { name } = useSelector(selectUser)
  const { loading } = useSelector(selectApp)
  const [drawAlert, setDrawAlert] = useState(false)

  useEffect(() => {
    setTimeout(() => setDrawAlert(Object.keys(newComments).length), 270)
  }, [newComments])

  const onClickHandler = (button) => {
    const { path, id } = button
    if (selectedTab !== id) {
      switch (id) {
        case 0:
          dispatch({
            type: SELECT_TASK,
            payload: selectedTaskId
          })
          break
        case 1:
          dispatch({
            type: SELECT_TASK_NEW
          })
          break
        default:
          break
      }
      setSelectedTab(id)
      navigate(path)
    }
  }

  const logoutHandler = () => {
    logout()
    setTimeout(() => navigate('/login'), 20)
  }

  const authButton = user ? 'Logout' : 'No User'

  return (
    <div className="header__container">
      <div className="flexrow">
        {headerButtons.map((button, index) => {
          const { name } = button
          return (
            <Button
              key={index}
              onClick={() => onClickHandler(button)}
              disabled={!user}
              label={name}
              width={110}
            />
          )
        })}
      </div>
      {gotNewComments ? (
        <div className="fade-in flexrow">
          <CommentsAlert />
        </div>
      ) : (
        <div className="fade-out flexrow">{drawAlert ? <CommentsAlert /> : null}</div>
      )}
      <div className="flexrow">
        {!loading && <div className="header__greeting">{user && `Welcome, ${name}`}</div>}
        <Button onClick={logoutHandler} disabled={!user} label={authButton} width={110} />
      </div>
    </div>
  )
}
