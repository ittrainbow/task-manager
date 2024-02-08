import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { CREATE_TASK_SUCCESS, SELECT_TASK, SET_ASSIGNED } from '../../redux/types'
import { Button, ButtonSet, Input, TextArea, Picker, Loader } from '../../UI'
import { InputTarget, TTaskCreate } from '../../interfaces'
import { CREATE_TASK_MUTATION } from '../../api/mutations'
import { selectUser } from '../../redux/selectors'

export const TaskNew = () => {
  const { _id } = useSelector(selectUser)
  const getTime = () => new Date().getTime()
  const dispatch = useDispatch()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(getTime() + 86400000)

  const [createTaskMutation, { data, loading }] = useMutation(CREATE_TASK_MUTATION)

  useEffect(() => {
    if (data) {
      const task = data.taskCreate
      dispatch({ type: CREATE_TASK_SUCCESS, payload: task })
    } 
    // eslint-disable-next-line
  }, [data])

  useEffect(() => {
    dispatch({ type: SET_ASSIGNED, payload: { assigned: _id } })
  }, [_id, dispatch])

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc.focus()
  }, [])

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeDeadline = (value: number) => setDeadline(value)

  const submitHandler = async () => {
    if (checkFormValid()) {
      const task: TTaskCreate = { assigned: _id, creator: _id, deadline, description, name }
      await createTaskMutation({ variables: task })
    }
  }

  const cancelHandler = () => dispatch({ type: SELECT_TASK })

  const nameHandler = (e: InputTarget) => setName(e.target.value)

  const descriptionHandler = (e: InputTarget) => setDescription(e.target.value)

  if (loading) return <Loader />

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
