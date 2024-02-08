import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { LOGIN_SUCCESS, SET_ERROR } from '../../redux/types'
import { LOGIN_MUTATION } from '../../api/mutations'
import { Button, Input, Loader } from '../../UI'
import { setLocalStorage } from '../../helpers'
import { InputTarget } from '../../interfaces'

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>(localStorage.getItem('taskman-email') || '')
  const [password, setPassword] = useState<string>(localStorage.getItem('taskman-password') || '')
  const [emailValid, setEmailValid] = useState<boolean>(true)

  const [loginMutation, { data, loading }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password }
  })

  useEffect(() => {
    if (data) {
      const { _id, email, name, token, error } = data.userLogin

      if (error) {
        dispatch({ type: SET_ERROR, payload: error })
        return alert(error)
      }

      dispatch({ type: LOGIN_SUCCESS, payload: { _id, email, name, token } })
      setLocalStorage(token)
      return navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [data])

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

  const signInHandler = async () => {
    if (!email) return alert('Please enter Email')
    if (!password) return alert('Please enter password')

    await loginMutation()
  }

  return (
    <div className="auth-container flexcol10">
      <div className="auth-container__inner">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flexcol10">
              <Input onChange={emailInputHandler} value={email} type="text" label="E-mail" />
              <Input onChange={passwordInputHandler} value={password} type="password" label={'Password'} />
            </div>
            <div className="auth-container flexcol10">
              <Button
                onClick={signInHandler}
                disabled={!emailValid || password.length < 4}
                label="Login"
                nonUser={true}
              />
              <Button label="Sign Up" onClick={() => navigate('/signup')} nonUser={true} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
