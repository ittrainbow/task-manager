import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { logout } from '../../db'
import { Loader } from '../../UI'

export const Dashboard = () => {
  const { name, email } = useSelector((store) => store.user)
  const { loading } = useSelector((store) => store.app)
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="auth-container">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div>{name}</div>
          <div>{email}</div>
          <div className="auth-container auth-container__button-block">
            <Button onClick={() => navigate('/profile')}>Edit profile</Button>
            <Button onClick={logoutHandler}>Log Out</Button>
          </div>
        </>
      )}
    </div>
  )
}
