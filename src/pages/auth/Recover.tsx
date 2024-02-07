import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { gotUser, selectLoading } from '../../redux/selectors'
import { InputTarget } from '../../interfaces'
import { Button, Input } from '../../UI'

export const Recover = () => {
  const navigate = useNavigate()
  const loading = useSelector(selectLoading)
  const user = useSelector(gotUser)
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
    // eslint-disable-next-line
  }, [user, loading])

  const emailInputHandler = (e: InputTarget) => {
    const { value } = e.target
    const email = value.replace(/ /g, '')
    const emailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    setEmailValid(emailValid)
  }

  const recoverHandler = () => {}

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        <Input onChange={emailInputHandler} value={email} type="text" label="E-mail" />
        <div className="auth-container flexcol10">
          <Button onClick={recoverHandler} disabled={!emailValid} label="Send recovery email" />
          <Button onClick={() => navigate('/signup')} label="Sign Up" />
          <Button onClick={() => navigate('/login')} label="Log In" />
        </div>
      </div>
    </div>
  )
}
