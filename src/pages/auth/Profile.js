import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

import { UPDATE_USER_ATTEMPT } from '../../redux/types'
import { selectUser } from '../../redux/selectors'

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
      Change Name
      <Form.Control onChange={(e) => setTempName(e.target.value)} value={tempName} />
      <div className="auth-container auth-container__button-block flexcol">
        <Button onClick={submitHandler} disabled={noChanges}>{noChanges ? 'No changes' : 'Save'}</Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </div>
  )
}
