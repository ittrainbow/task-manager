import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../../UI'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../db/firebase'
import { logInWithEmailAndPassword, signInWithGoogle } from '../../db/auth'
import { EventTarget } from '../../interfaces'

export const Login = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  useEffect(() => {
    user && navigate('/') // eslint-disable-next-line
  }, [user])

  const emailInputHandler = (e: EventTarget) => {
    const { value } = e.target
    const email = value.replace(/ /g, '')
    const emailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    setEmailValid(emailValid)
  }

  const passwordInputHandler = (e: EventTarget) => {
    const { value } = e.target
    setPassword(value.replace(/ /g, ''))
  }

  const googleSignInHandler = () => {
    navigate('/')
    signInWithGoogle()
  }

  return (
    <div className="auth-container flexcol10">
      <div className="auth-container__inner">
        <div className="flexcol10">
          <Input onChange={emailInputHandler} value={email} type="text" label="E-mail" />
          <Input
            onChange={passwordInputHandler}
            value={password}
            type="password"
            label={'Password'}
          />
        </div>
        <div className="auth-container flexcol10">
          <Button
            onClick={() => logInWithEmailAndPassword(email, password)}
            disabled={!emailValid || password.length < 4}
            label="Sign In"
          />
          <Button label="Google Sign In" onClick={googleSignInHandler} />
          <Button label="Recover Password" onClick={() => navigate('/reset')} />
          <Button label="Sign Up" onClick={() => navigate('/register')} />
        </div>
      </div>
    </div>
  )
}
