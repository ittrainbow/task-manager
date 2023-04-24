import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../db/firebase'
import { logInWithEmailAndPassword, signInWithGoogle } from '../../db/auth'

export const Login = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)

  useEffect(() => {
    user && navigate('/') 
    // eslint-disable-next-line
  }, [user])

  const emailInputHandler = (e) => {
    const { value } = e.target
    const email = value.replace(/ /g, '')
    const emailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    setEmailValid(emailValid)
  }

  const passwordInputHandler = (e) => {
    const { value } = e.target
    setPassword(value.replace(/ /g, ''))
  }

  const googleSignInHandler = () => {
    navigate('/')
    signInWithGoogle()
  }

  return (
    <div className="auth-container">
      <Form.Control onChange={emailInputHandler} value={email} type='text' placeholder="E-mail" />
      <Form.Control onChange={passwordInputHandler} value={password} type='password' placeholder={'Password'} />
      <div className="auth-container auth-container__button-block">
        <Button
          onClick={() => logInWithEmailAndPassword(email, password)}
          disabled={!emailValid || password.length < 4}
        >
          Sign In
        </Button>
        <Button onClick={googleSignInHandler}>Google Sign In</Button>
        <Button onClick={() => navigate('/reset')}>Recover Password</Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
      </div>
    </div>
  )
}
