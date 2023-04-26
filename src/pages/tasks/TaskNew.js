import React, { useState } from 'react'
import { Button, Input } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, Select } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { selectUser } from '../../redux/selectors'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector(selectUser)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime() + 86400000)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)

  const checkFormValid = () => name.length > 0 && description.length > 0

  const onChangeDeadline = (value) => {
    setDeadline(value)
  }

  const submitHandler = () => {
    if (checkFormValid()) {
      const time = new Date().getTime()
      const task = {
        creator: uid,
        id: time,
        lastmodified: time,
        comments: [],
        name,
        description,
        deadline,
        status,
        assigned
      }
      dispatch({
        type: SAVE_TASK_ATTEMPT,
        payload: { task }
      })
    }
  }

  const cancelHandler = () => {
    dispatch({
      type: SELECT_TASK,
      payload: null
    })
  }
  const onChangeStatus = (value) =>setStatus(value)
  const onChangeUser = (value) => setAssigned(value)

  return (
    <>
      <div className="tasknew__container flexcol">
        <div className="flexrow">
          <div className="selector flexcol">
            <Select value={assigned} variant="users" onChange={onChangeUser} label="Assign User" />
          </div>
          <div className="selector flexcol">
            <Select value={status} variant="status" onChange={onChangeStatus} label="Set Status" />
          </div>
        </div>
        <div className="flexcol15 ph10">
          <Input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            label="Task name"
          />
          <Input
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            label="Task description"
            multiline={true}
            rows={7}
          />
          <div className="flexcol">
            <Picker value={deadline} onChange={onChangeDeadline} />
          </div>
          <div className="flexrow">
            <Button onClick={() => setDeadline(deadline - 86400000)} value="-1 day" />
            <Button onClick={() => setDeadline(deadline - 10800000)} value="-3 hours" />
            <Button onClick={() => setDeadline(deadline + 10800000)} value="+3 hours" />
            <Button
              variant="contained"
              onClick={() => setDeadline(deadline + 86400000)}
              value="+1 day"
            />
            <Button
              variant="contained"
              onClick={() => setDeadline(deadline + 604800000)}
              value="+1 week"
            />
          </div>
        </div>
        <div className="tasks-footer flexrow">
          <Button
            variant="contained"
            onClick={submitHandler}
            disabled={!checkFormValid()}
            value="Submit"
          />
          <Button variant="contained" onClick={cancelHandler} value="Cancel" />
        </div>
      </div>
    </>
  )
}
