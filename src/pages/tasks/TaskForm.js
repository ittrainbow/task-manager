import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { DropdownMenu, Comments } from '../../UI'
import { REMOVE_TASK_FROM_WORK, SAVE_TASK_ATTEMPT } from '../../redux/types'
import { convertMilliesToISO, getFromUserlist } from '../../helpers'

export const TaskForm = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector((store) => store.user)
  const { task, newTask, newTaskId } = useSelector((store) => store.task)
  const { userlist } = useSelector((store) => store.app)

  const dispatch = useDispatch()
  const [id, setId] = useState(newTaskId)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [comments, setComments] = useState([])
  const [appointed, setAppointed] = useState(null)

  useEffect(() => {
    if (task) {
      const { name, description, deadline, status, comments, appointed, id } = task
      setName(name)
      setDescription(description)
      setDeadline(deadline)
      setStatus(status)
      setComments(comments)
      setAppointed(appointed)
      setId(id)
    }
  }, [task])

  const checkFormValid = () => {
    // if (task) {
    //   return task && name.length > 0 && description.length > 0
    // }
    return true
  }
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
    const user = appointed && getFromUserlist({ userlist, uid: appointed })
    const { readableTime } = convertMilliesToISO(deadline)

    return (
      <>
        <div className="info-card">Name: {name}</div>
        <div className="info-card">Description: {description}</div>
        <div className="info-card">User: {user}</div>
        <div className="info-card">Deadline: {readableTime}</div>
      </>
    )
  }

  const cancelHandler = () => {
    dispatch({
      type: REMOVE_TASK_FROM_WORK
    })
  }

  return (
    <div className="task__container">
      {!task ? (
        <></>
      ) : (
        // <Button onClick={newTaskHandler}>New Task</Button>
        <>
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
        </>
      )}
    </div>
  )
}
