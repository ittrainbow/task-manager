import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { SELECT_TASK } from '../redux/types'

const headerButtons = [
  { name: 'Tasks', path: '/', id: 0 },
  { name: 'Dashboard', path: '/dashboard', id: 1 },
  { name: 'New Task', path: '/', id: 2 }
]

export const HeaderTab = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { newTaskId } = useSelector((store) => store.task)

  const onClickHandler = (button) => {
    const { path, id } = button
    id !== 1 &&
      dispatch({
        type: SELECT_TASK,
        payload: id === 2 ? newTaskId : null
      })
    navigate(path)
  }

  return (
    <div className="header">
      {headerButtons.map((button, index) => {
        const { name } = button
        return (
          <Button key={index} onClick={() => onClickHandler(button)} className="header__button-div">
            {name}
          </Button>
        )
      })}
    </div>
  )
}
