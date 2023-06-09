import React, { useEffect, useState, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../../UI'

import { registerWithEmailAndPassword, signInWithGoogle } from '../../db/auth'
import { auth } from '../../db/firebase'
import { EventTarget } from '../../interfaces'

type State = {
  email: string
  password: string
  name: string
  emailValid: boolean
}

const initialState: State = {
  email: '',
  password: '',
  name: '',
  emailValid: false
}

// const reducer = (state: State, action) => {
//   switch (action.type) {
//     case 'EMAIL':
//       const email = action.payload.replace(/ /g, '')
//       const emailValid = /\S+@\S+\.\S+/.test(email)
//       return { ...state, email, emailValid }
//     case 'PASSWORD':
//       return { ...state, password: action.payload.replace(/ /g, '') }
//     case 'NAME':
//       return { ...state, name: action.payload }
//     default:
//       return state
//   }
// }

export const Register = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  // const [state, dispatch] = useReducer(reducer, initialState)
  // const { email, emailValid, password, name } = state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (password.length < 3) alert('Please type password of 3 chars or more')
    else registerWithEmailAndPassword(name, email, password)
  }

  const nameInputHandler = (e: EventTarget) => {
    const { value } = e.target
    setName(value)
  }

  const emailInputHandler = (e: EventTarget) => {
    const { value } = e.target
    const emailValid = /\S+@\S+\.\S+/.test(value)
    setEmail(value)
    setEmailValid(emailValid)
  }

  const passwordInputHandler = (e: EventTarget) => {
    const { value } = e.target
    setPassword(value)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [loading, user, navigate])

  return (
    <div className="auth-container flexcol10">
      <div className="auth-container__inner">
        <div className="flexcol10">
          <Input type="text" value={name} onChange={nameInputHandler} label="Name" />
          <Input type="text" value={email} onChange={emailInputHandler} label="E-mail" />
          <Input
            type="password"
            value={password}
            onChange={passwordInputHandler}
            label="Password"
          />
        </div>
        <div className="auth-container flexcol10">
          <Button
            onClick={register}
            label="Sign Up New User"
            disabled={!emailValid || !password || !name}
          />
          <Button onClick={signInWithGoogle} label="Google Sign Up" />
          <Button onClick={() => navigate('/login')} label="Log In" />
        </div>
      </div>
    </div>
  )
}
