import React, { useState } from 'react'
import { Button, Input } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, Dropdown, Select } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { selectUser } from '../../redux/selectors'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector(selectUser)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)

  const checkFormValid = () => name.length > 0 && description.length > 0

  const onChangeDeadline = ({ value }) => {
    const time = new Date(value).getTime()
    setDeadline(time)
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
  const onChangeStatus = (option) => {
    const { value } = option
    setStatus(value)
  }
  const onChangeUser = (option) => {
    const { value } = option
    setAssigned(value)
  }

  return (
    <>
      <div className="tasknew__container flexcol">
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
          rows={4}
        />
        <div className="tasknew__dropdowns flexcol">
          <div className="flexrow">
            <div className="picker-header flexcol">Appoint user</div>
            <div className="picker-dropdown flexcol">
              <Dropdown value={assigned} variant="users" tasknew={true} onChange={onChangeUser} />
            </div>
          </div>
          <div className="flexrow">
            <div className="picker-header flexcol">Select status</div>
            <div className="picker-dropdown flexcol">
              <Dropdown value={status} variant="status" tasknew={true} onChange={onChangeStatus} />
            </div>
          </div>
          <div className="flexrow">
            <div className="picker-header flexcol">Set deadline</div>
            <Picker onChange={(e) => onChangeDeadline(e.target)} value={deadline} />
          </div>

          <div className="flexrow picker-buttons">
            <Button onClick={() => setDeadline(deadline - 86400000)} value="-1 day" />
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
