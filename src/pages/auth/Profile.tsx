import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SET_ERROR, UPDATE_USER_SUCCESS } from '../../redux/types'
import { USER_UPDATE_MUTATION } from '../../api/mutations'
import { selectUser } from '../../redux/selectors'
import { Button, Input, Loader } from '../../UI'
import { InputTarget } from '../../interfaces'

export const Profile = () => {
  const { name, _id } = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tempName, setTempName] = useState<string>('')
  const noChanges = name === tempName

  const [userUpdateMutation, { data, loading }] = useMutation(USER_UPDATE_MUTATION, {
    variables: { name: tempName, _id }
  })

  useEffect(() => {
    name && setTempName(name)
  }, [name])

  useEffect(() => {
    if (data) {
      const { name, error } = data.userUpdate

      if (error) {
        dispatch({ type: SET_ERROR, payload: error })
        return alert(error)
      }

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { _id, name } })
      return navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [data])

  const submitHandler = async () => await userUpdateMutation()

  const onChangeHandler = (e: InputTarget) => setTempName(e.target.value)

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Input onChange={onChangeHandler} type="text" value={tempName} label="Change name" />
            <div className="mt40 flexcol10">
              <Button onClick={submitHandler} disabled={noChanges} label="Submit" />
              <Button onClick={() => navigate(-1)} label={noChanges ? 'Back' : 'Cancel'} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
