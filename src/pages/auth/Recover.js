import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../../UI'

import { sendPasswordReset } from '../../db/auth'
import { auth } from '../../db/firebase'

export const Recover = () => {
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
    <div className="auth-container flexcol">
      <Input onChange={emailInputHandler} value={email} type='text' label="E-mail" />
      <div className="auth-container auth-container__button-block flexcol">
        <Button
          onClick={() => sendPasswordReset(email)}
          disabled={!emailValid}
          label="Send recovery email"
        />
        <Button onClick={() => navigate('/register')} label="Sign Up" />
        <Button onClick={() => navigate('/login')} label="Log In" />
      </div>
    </div>
  )
}
