import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SET_ERROR, SIGNUP_SUCCESS } from '../../redux/types'
import { SIGNUP_MUTATION } from '../../api/mutations'
import { Button, Input, Loader } from '../../UI'
import { setLocalStorage } from '../../helpers'
import { InputTarget } from '../../interfaces'

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>(localStorage.getItem('taskman-email') || '')
  const [password, setPassword] = useState<string>(localStorage.getItem('taskman-password') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  const [signupMutation, { data, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { name, email, password }
  })

  useEffect(() => {
    if (data) {
      const { _id, email, name, token, error } = data.userCreate

      if (error) {
        dispatch({ type: SET_ERROR, payload: error })
        return alert(error)
      }

      dispatch({ type: SIGNUP_SUCCESS, payload: { _id, email, name, token } })
      setLocalStorage(token)
      return navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [data])

  const register = async () => {
    if (!name) return alert('Please enter name')
    if (!email) return alert('Please enter Email')
    if (!password) return alert('Please type password of 3 chars or more')

    await signupMutation()
  }

  const nameHandler = (e: InputTarget) => setName(e.target.value)

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
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flexcol10">
              <Input type="text" value={name} onChange={nameHandler} label="Name" />
              <Input type="text" value={email} onChange={emailHandler} label="E-mail" />
              <Input type="password" value={password} onChange={passwordHandler} label="Password" />
            </div>
            <div className="auth-container flexcol10">
              <Button onClick={register} label="Sign Up" disabled={!emailValid || !password || !name} nonUser={true} />
              <Button onClick={() => navigate('/login')} label="Log In" nonUser={true} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
