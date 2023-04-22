import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { logInWithEmailAndPassword, signInWithGoogle } from '../../db/auth'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)

  const emailInputHandler = (e) => {
    const { value } = e.target
    const emailValid = /\S+@\S+\.\S+/.test(value)

    setEmail(value)
    setEmailValid(emailValid)
  }

  const passwordInputHandler = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  return (
    <div className="auth-container">
      <Form.Control onChange={emailInputHandler} placeholder="E-mail" />
      <Form.Control onChange={passwordInputHandler} placeholder={'Password'} />
      <div className="auth-container auth-container__button-block">
        <Button
          onClick={() => logInWithEmailAndPassword(email, password)}
          disabled={!emailValid || password.length < 4}
        >
          Sign In
        </Button>
        <Button onClick={signInWithGoogle}>Google Sign In</Button>
        <Button onClick={() => navigate('/reset')}>Recover Password</Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
      </div>
    </div>
  )
}
