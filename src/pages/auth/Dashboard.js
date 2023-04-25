import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Loader } from '../../UI'
import { auth } from '../../db/firebase'
import { selectLoading, selectUser } from '../../redux/selectors'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const loading = useSelector(selectLoading)
  const { name, email } = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/') 
    // eslint-disable-next-line
  }, [])

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
          </div>
        </>
      )}
    </div>
  )
}
