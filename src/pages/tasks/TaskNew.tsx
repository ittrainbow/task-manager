import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_TASK, SELECT_TASK, SET_ASSIGNED } from '../../redux/types'
import { Button, ButtonSet, Input, TextArea, Picker } from '../../UI'
import { InputTarget, TTaskCreate } from '../../interfaces'
import { selectUser } from '../../redux/selectors'
import { useNavigate } from 'react-router-dom'

export const TaskNew = () => {
  const { _id } = useSelector(selectUser)
  const getTime = () => new Date().getTime()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(getTime() + 86400000)

  useEffect(() => {
    dispatch({ type: SET_ASSIGNED, payload: { assigned: _id } })
  }, [_id, dispatch])

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc.focus()
  }, [])

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeDeadline = (value: number) => setDeadline(value)

  const submitHandler = () => {
    if (checkFormValid()) {
      const status = 'new'
      const task: TTaskCreate = { creator: _id, comments: [], name, description, deadline, status, assigned: _id }
      dispatch({ type: CREATE_TASK, payload: task })
      navigate('/')
    }
  }

  const cancelHandler = () => {
    dispatch({ type: SELECT_TASK })
  }

  const nameHandler = (e: InputTarget) => {
    const { value } = e.target
    setName(value)
  }

  const descriptionHandler = (e: InputTarget) => {
    const { value } = e.target
    setDescription(value)
  }

  return (
    <>
      <div className="flexcol task-task">
        <div className="tasknew-container flexnew">
          <Input type="text" value={name} onChange={nameHandler} label="Task name" task={true} />
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
          <Button onClick={submitHandler} disabled={!checkFormValid()} label="Submit" />
          <Button onClick={cancelHandler} label="Cancel" />
        </div>
      </div>
    </>
  )
}
