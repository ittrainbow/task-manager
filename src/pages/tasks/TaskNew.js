import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, Dropdown } from '../../UI'
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
      <div className="tasknew__container">
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
        />
        <textarea
          className="tasknew__description"
          value={description}
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <div className="tasknew__dropdowns">
          <div className="tasknew__dropdowns__select">
            <Dropdown value={assigned} variant="users" tasknew={true} onChange={onChangeUser} />
          </div>
          <div className="tasknew__dropdowns__select">
            <Dropdown value={status} variant="status" onChange={onChangeStatus} />
          </div>
        </div>
        <Picker onChange={(e) => onChangeDeadline(e.target)} value={deadline} />
        <div className="tasknew__dates">
          <Button onClick={() => setDeadline(deadline - 86400000)}>-1 day</Button>
          <Button onClick={() => setDeadline(deadline - 3600000)}>-1 hour</Button>
          <Button onClick={() => setDeadline(deadline + 3600000)}>+1 hour</Button>
          <Button onClick={() => setDeadline(deadline + 86400000)}>+1 day</Button>
          <Button onClick={() => setDeadline(deadline + 604800000)}>+1 week</Button>
        </div>
        <div className="tasks-footer">
          <Button onClick={submitHandler} disabled={!checkFormValid()}>
            Submit
          </Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </div>
      </div>
    </>
  )
}
