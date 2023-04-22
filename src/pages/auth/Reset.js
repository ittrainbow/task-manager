import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { sendPasswordReset } from '../../db/auth'
import { auth } from '../../db/firebase'

export const Reset = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  const emailInputHandler = (e) => {
    const { value } = e.target
    const email = value.replace(/ /g, '')
    const emailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    setEmailValid(emailValid)
  }

  return (
    <div className="auth-container">
      <Form.Control onChange={emailInputHandler} value={email} placeholder="E-mail" />
      <div className="auth-container auth-container__button-block">
        <Button onClick={() => sendPasswordReset(email)} disabled={!emailValid}>
          Send recovery e-mail
        </Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </div>
    </div>
  )
}
