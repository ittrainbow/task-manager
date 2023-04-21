import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, DropdownMenu } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector((store) => store.user)
  const { newTaskId } = useSelector((store) => store.task)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [appointed, setAppointed] = useState(null)

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeStatus = (status) => setStatus(status)
  const onChangeUser = (uid) => setAppointed(uid)

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
        appointed,
        id: newTaskId
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
      payload: { id: null }
    })
  }

  return (
    <>
      <div className="tasklist__container">
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
        />
        <textarea
          className="tasklist__description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <div className="task__dropdowns">
          <DropdownMenu value={status} statusSelector={true} onChange={onChangeStatus} />
          <DropdownMenu
            value={appointed}
            statusSelector={false}
            appointed={appointed}
            onChange={onChangeUser}
          />
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
