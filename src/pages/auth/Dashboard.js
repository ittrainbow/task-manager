import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { logout } from '../../db/auth'
import { Loader } from '../../UI'
import { auth } from '../../db/firebase'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const { loading } = useSelector((store) => store.app)
  const { name, email } = useSelector((store) => store.user)
  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/') // eslint-disable-next-line
  }, [])

  const logoutHandler = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth-container">
      {loading ? (
        <Loader />
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
