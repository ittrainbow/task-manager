import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gotUser } from '../../redux/selectors'
import { InputTarget } from '../../interfaces'
import { LOGIN } from '../../redux/types'
import { Button, Input } from '../../UI'

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(gotUser)

  useEffect(() => {
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [user])

  const [email, setEmail] = useState<string>(localStorage.getItem('taskman-email') || '')
  const [password, setPassword] = useState<string>(localStorage.getItem('taskman-password') || '')
  const [emailValid, setEmailValid] = useState<boolean>(true)

  const emailInputHandler = (e: InputTarget) => {
    const { value } = e.target
    const email = value.replace(/ /g, '')
    const emailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    localStorage.setItem('taskman-email', email)
    setEmailValid(emailValid)
  }

  const passwordInputHandler = (e: InputTarget) => {
    const { value } = e.target
    setPassword(value.replace(/ /g, ''))
    localStorage.setItem('taskman-password', value)
  }

  const signInHandler = () => {
    dispatch({ type: LOGIN, payload: { email, password } })
  }

  return (
    <div className="auth-container flexcol10">
      <div className="auth-container__inner">
        <div className="flexcol10">
          <Input onChange={emailInputHandler} value={email} type="text" label="E-mail" />
          <Input onChange={passwordInputHandler} value={password} type="password" label={'Password'} />
        </div>
        <div className="auth-container flexcol10">
          <Button onClick={signInHandler} disabled={!emailValid || password.length < 4} label="Login" nonUser={true} />
          <Button label="Sign Up" onClick={() => navigate('/signup')} nonUser={true} />
        </div>
      </div>
    </div>
  )
}
