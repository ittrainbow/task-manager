import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SIGNUP } from '../../redux/types'
import { gotUser } from '../../redux/selectors'
import { InputTarget } from '../../interfaces'
import { Button, Input } from '../../UI'

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>(localStorage.getItem('taskman-email') || '')
  const [password, setPassword] = useState<string>(localStorage.getItem('taskman-password') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const user = useSelector(gotUser)

  useEffect(() => {
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [user])

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (!password) alert('Please type password of 3 chars or more')
    else dispatch({ type: SIGNUP, payload: { name, email, password } })
  }

  const nameHandler = (e: InputTarget) => {
    const { value } = e.target
    setName(value)
  }

  const emailHandler = (e: InputTarget) => {
    const { value } = e.target
    const emailValid = /\S+@\S+\.\S+/.test(value)
    setEmail(value)
    setEmailValid(emailValid)
    localStorage.setItem('taskman-email', value)
  }

  const passwordHandler = (e: InputTarget) => {
    const { value } = e.target
    setPassword(value)
    localStorage.setItem('taskman-password', value)
  }

  return (
    <div className="auth-container flexcol10">
      <div className="auth-container__inner">
        <div className="flexcol10">
          <Input type="text" value={name} onChange={nameHandler} label="Name" />
          <Input type="text" value={email} onChange={emailHandler} label="E-mail" />
          <Input type="password" value={password} onChange={passwordHandler} label="Password" />
        </div>
        <div className="auth-container flexcol10">
          <Button onClick={register} label="Sign Up" disabled={!emailValid || !password || !name} nonUser={true} />
          <Button onClick={() => navigate('/login')} label="Log In" nonUser={true} />
        </div>
      </div>
    </div>
  )
}
