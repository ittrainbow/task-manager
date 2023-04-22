import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { registerWithEmailAndPassword, signInWithGoogle } from '../../db/auth'
import { auth } from '../../db/firebase'

const initialState = {
  email: '',
  password: '',
  name: '',
  emailValid: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      const email = action.payload.replace(/ /g, '')
      const emailValid = /\S+@\S+\.\S+/.test(email)
      return { ...state, email, emailValid }
    case 'PASSWORD':
      return { ...state, password: action.payload.replace(/ /g, '') }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, emailValid, password, name } = state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (password.length < 3) alert('Please type password of 3 chars or more')
    else registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [loading, user, navigate])

  return (
    <div className="auth-container">
      <Form.Control
        type="text"
        value={name}
        onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
        placeholder="Name"
      />
      <Form.Control
        type="text"
        value={email}
        onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
        placeholder="E-mail"
      />
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
        placeholder="Password"
      />
      <div className="auth-container auth-container__button-block">
        <Button onClick={register} disabled={!emailValid || !password || !name}>
          Sign Up New User
        </Button>
        <Button onClick={signInWithGoogle}>Google Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Log In</Button>
      </div>
    </div>
  )
}
