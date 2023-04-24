import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, DropdownUser, DropdownStatus } from '../../UI'
import { SAVE_NEW_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { selectTask, selectUser } from '../../redux/selectors'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector(selectUser)
  const { newTaskId } = useSelector(selectTask)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeStatus = (status) => setStatus(status)
  const onChangeUser = (uid) => setAssigned(uid)

  const onChangeDeadline = ({ value }) => {
    const time = new Date(value).getTime()
    setDeadline(time)
  }

  const submitHandler = () => {
    if (checkFormValid()) {
      const task = {
        creator: uid,
        lastmodified: new Date().getTime(),
        comments: [],
        name,
        description,
        deadline,
        status,
        assigned,
        id: newTaskId
      }
      dispatch({
        type: SAVE_NEW_TASK_ATTEMPT,
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
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <div className="tasknew__dropdowns">
          <DropdownStatus value={status} onChange={onChangeStatus} />
          <DropdownUser value={assigned} assigned={assigned} onChange={onChangeUser} />
          <Picker onChange={(e) => onChangeDeadline(e.target)} value={deadline} />
        </div>
        <Button onClick={submitHandler} disabled={!checkFormValid()}>
          Submit
        </Button>
        <Button onClick={cancelHandler}>Cancel</Button>
      </div>
    </>
  )
}
