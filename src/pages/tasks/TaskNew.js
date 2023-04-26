import React, { useState, useEffect } from 'react'
import { Button, ButtonSet, Input } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'

import { Picker } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { selectUser } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector(selectUser)
  const { assigned, setAssigned, status, setStatus } = useAppContext()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime() + 86400000)

  useEffect(() => {
    setStatus('New')
    setAssigned(uid) // eslint-disable-next-line
  }, [uid])

  
  useEffect(() => {
    const doc = document.querySelector('.MuiInputBase-input')
    doc.focus()
  }, [])

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeDeadline = (value) => setDeadline(value)

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
        status: status,
        assigned: assigned
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

  return (
    <>
      <div className="flexcol task-task">
        <div className="tasknew-container flexcol10">
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
            maxRows={5}
          />
          <div className="flexcol">
            <Picker value={deadline} onChange={onChangeDeadline} />
          </div>
          <ButtonSet deadline={deadline} setDeadline={setDeadline} variant={5} />
        </div>
        <div className="tasks-footer flexrow">
          <Button
            variant="contained"
            onClick={submitHandler}
            disabled={!checkFormValid()}
            label="Submit"
          />
          <Button variant="contained" onClick={cancelHandler} label="Cancel" />
        </div>
      </div>
    </>
  )
}
