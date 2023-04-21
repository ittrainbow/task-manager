import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { sendPasswordReset } from '../../db/auth'
import { auth } from '../../db/firebase'

export const Reset = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <div className="auth-container">
      <Form.Control onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <div className="auth-container auth-container__button-block">
        <Button onClick={() => sendPasswordReset(email)}>Send recovery e-mail</Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </div>
    </div>
  )
}
