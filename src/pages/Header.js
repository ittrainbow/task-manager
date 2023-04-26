import React, { useState } from 'react'
import { Button } from '../UI'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db/firebase'
import { SELECT_TASK, SELECT_TASK_NEW } from '../redux/types'
import { logout } from '../db/auth'
import { selectApp, selectTask, selectUser } from '../redux/selectors'

const headerButtons = [
  { name: 'Tasks', path: '/', id: 0 },
  { name: 'New Task', path: '/newtask', id: 1 },
  { name: 'Dashboard', path: '/dashboard', id: 2 }
]

export const HeaderTab = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedTaskId } = useSelector(selectTask)
  const { name } = useSelector(selectUser)
  const { loading } = useSelector(selectApp)

  const onClickHandler = (button) => {
    const { path, id } = button
    if (currentTab !== id) {
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
      setCurrentTab(id)
      navigate(path)
    }
  }

  const logoutHandler = () => {
    logout()
    setTimeout(() => navigate('/login'), 20)
  }

  const authButton = user ? 'Logout' : 'No User'

  return (
    <div className="header-container">
      <div className="flexrow">
        {headerButtons.map((button, index) => {
          const { name } = button
          return (
            <Button
              key={index}
              onClick={() => onClickHandler(button)}
              disabled={!user}
              value={name}
              width={110}
            />
          )
        })}
      </div>
      <div className="flexrow">
        {!loading && <div className="header__greeting">{user && `Welcome, ${name}`}</div>}
        <Button onClick={logoutHandler} disabled={!user} value={authButton} width={110} />
      </div>
    </div>
  )
}
