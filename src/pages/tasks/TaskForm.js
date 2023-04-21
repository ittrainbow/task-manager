import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { DropdownMenu, Comments } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK } from '../../redux/types'
import { convertMilliesToISO, getFromUserlist } from '../../helpers'

const getTime = () => new Date().getTime()

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { uid } = useSelector((store) => store.user)
  const { userlist } = useSelector((store) => store.app)
  const { tasks, selectedTaskId, newTaskId } = useSelector((store) => store.task)

  const [id, setId] = useState(newTaskId)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [comments, setComments] = useState([])
  const [creator, setCreator] = useState(null)
  const [appointed, setAppointed] = useState(null)

  useEffect(() => {
    if (selectedTaskId || selectedTaskId === 0) {
      const task = tasks.filter((task) => task.id === selectedTaskId)[0]
      const { name, description, deadline, status, comments, creator, appointed, id } = task

      setName(name)
      setDescription(description)
      setDeadline(deadline)
      setStatus(status)
      setComments(comments)
      setCreator(creator)
      setAppointed(appointed)
      setId(id)
    } // eslint-disable-next-line
  }, [selectedTaskId])

  const checkFormValid = () => name.length > 0 && description.length > 0
  const onChangeStatus = (status) => setStatus(status)

  const onSubmitComment = (newComment) => {
    const newComments = [...comments]
    newComments.push(newComment)
    setComments(newComments)
  }

  const submitHandler = () => {
    if (checkFormValid()) {
      const task = {
        creator: uid,
        lastmodified: new Date().getTime(),
        comments,
        name,
        description,
        deadline,
        status,
        appointed,
        id
      }
      dispatch({
        type: SAVE_TASK_ATTEMPT,
        payload: { id, task }
      })
    }
  }

  const renderInfoCards = () => {
    const openedby = creator && getFromUserlist({ userlist, uid: creator })
    const responsible = appointed && getFromUserlist({ userlist, uid: appointed })
    const { readableTime } = convertMilliesToISO(deadline)

    return (
      <>
        <div className="info-card">Name: {name}</div>
        <div className="info-card">Description: {description}</div>
        <div className="info-card">Opened by: {openedby}</div>
        {appointed ? <div className="info-card">Responsible: {responsible}</div> : ''}
        <div className="info-card">Deadline: {readableTime}</div>
      </>
    )
  }

  const cancelHandler = () => {
    dispatch({
      type: SELECT_TASK,
      payload: { selectedTaskId: null }
    })
  }

  return (
    <div className="task__container">
      <div className="task__split">
        {renderInfoCards()}
        <DropdownMenu value={status} statusSelector={true} onChange={onChangeStatus} />
        <Button onClick={submitHandler} disabled={!checkFormValid()}>
          Submit
        </Button>
        <Button onClick={cancelHandler}>Cancel</Button>
      </div>
      <div className="task__split">
        <Comments comments={comments} onSubmitComment={onSubmitComment} />
      </div>
    </div>
  )
}
