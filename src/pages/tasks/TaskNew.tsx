import { useState, useEffect } from 'react'
import { Button, ButtonSet, Input, TextArea } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'

import { Picker } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { selectUser } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'
import { EventTarget } from '../../interfaces'

export const TaskNew = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector(selectUser)
  const { assigned, setAssigned, status, setStatus } = useAppContext()
  const dispatch = useDispatch()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(getTime() + 86400000)

  useEffect(() => {
    setStatus('New')
    setAssigned(uid) // eslint-disable-next-line
  }, [uid])

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc.focus()
  }, [])

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeDeadline = (value: number) => setDeadline(value)

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

  const nameHandler = (e: EventTarget) => {
    const { value } = e.target
    setName(value)
  }

  const descriptionHandler = (e: EventTarget) => {
    const { value } = e.target
    setDescription(value)
  }

  return (
    <>
      <div className="flexcol task-task">
        <div className="tasknew-container flexnew">
          <Input
            type="text"
            value={name}
            onChange={nameHandler}
            label="Task name"
            task={true}
          />
          <TextArea
            type="text"
            value={description}
            onChange={descriptionHandler}
            label="Description"
            task={true}
            rows={5}
          />
          <Picker value={deadline} onChange={onChangeDeadline} />
          <ButtonSet deadline={deadline} setDeadline={setDeadline} variant={5} />
        </div>
        <div className="tasks-footer flexrow">
          <Button
            // variant="contained"
            onClick={submitHandler}
            disabled={!checkFormValid()}
            label="Submit"
          />
          <Button onClick={cancelHandler} label="Cancel" />
        </div>
      </div>
    </>
  )
}
