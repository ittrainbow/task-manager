import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_USER_ATTEMPT } from '../../redux/types'
import { selectUser } from '../../redux/selectors'
import { Button, Input } from '../../UI'
import { EventTarget } from '../../interfaces'

export const Profile = () => {
  const { name, uid } = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [tempName, setTempName] = useState(name)

  const submitHandler = async () => {
    dispatch({
      type: UPDATE_USER_ATTEMPT,
      payload: { uid, name: tempName }
    })
    navigate('/dashboard')
  }

  const onChangeHandler = (e: EventTarget) => {
    const { value } = e.target
    setTempName(value)
  }

  const noChanges = name === tempName

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        <Input onChange={onChangeHandler} type="text" value={tempName} label="Change name" />
        <div className="mt40 flexcol10">
          <Button
            onClick={submitHandler}
            disabled={noChanges}
            label={noChanges ? 'No changes' : 'Save'}
          />
          <Button onClick={() => navigate(-1)} label="Cancel" />
        </div>
      </div>
    </div>
  )
}
