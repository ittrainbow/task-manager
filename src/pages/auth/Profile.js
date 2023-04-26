import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_USER_ATTEMPT } from '../../redux/types'
import { selectUser } from '../../redux/selectors'
import { Button, Input } from '../../UI'

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

  const noChanges = name === tempName

  return (
    <div className="auth-container flexcol">
      <Input onChange={(e) => setTempName(e.target.value)} value={tempName} label="Change name" />
      <div className="auth-container auth-container__button-block flexcol">
        <Button
          onClick={submitHandler}
          disabled={noChanges}
          value={noChanges ? 'No changes' : 'Save'}
        />
        <Button onClick={() => navigate(-1)} value="Cancel" />
      </div>
    </div>
  )
}
