import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db/firebase'
import { SELECT_TASK } from '../redux/types'
import { logout } from '../db/auth'
import { selectApp, selectTask, selectUser } from '../redux/selectors'

const headerButtons = [
  { name: 'Tasks', path: '/', id: 0 },
  { name: 'New Task', path: '/newtask', id: 1 },
  { name: 'Dashboard', path: '/dashboard', id: 2 }
]

export const HeaderTab = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { newTaskId } = useSelector(selectTask)
  const { name } = useSelector(selectUser)
  const { loading } = useSelector(selectApp)

  const onClickHandler = (button) => {
    const { path, id } = button
    id !== 2 &&
      dispatch({
        type: SELECT_TASK,
        payload: id === 1 ? newTaskId : null
      })
    navigate(path)
  }

  const logoutHandler = () => {
    logout()
    setTimeout(() => navigate('/login'), 20)
  }

  const autnButton = user ? 'Logout' : 'No User'

  return (
    <div className="header-container">
      <div className="header">
        {headerButtons.map((button, index) => {
          const { name } = button
          return (
            <Button
              key={index}
              onClick={() => onClickHandler(button)}
              className="header__button"
              disabled={!user}
            >
              {name}
            </Button>
          )
        })}
      </div>
      <div className="header">
        {!loading && <div className="header__greeting">{user && `Welcome, ${name}`}</div>}
        <Button onClick={logoutHandler} className="header__button" disabled={!user}>
          {autnButton}
        </Button>
      </div>
    </div>
  )
}
