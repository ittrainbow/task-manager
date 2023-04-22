import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { logout } from '../../db/auth'

export const Dashboard = () => {
  const { name, email } = useSelector((store) => store.user)
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div>{name}</div>
      <div>{email}</div>
      <div className="auth-container auth-container__button-block">
        <Button onClick={() => navigate('/profile')}>Edit profile</Button>
        <Button onClick={logoutHandler}>Log Out</Button>
      </div>
    </div>
  )
}
