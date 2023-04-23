import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { DropdownStatus, DropdownUser, Comments } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK, DELETE_TASK_ATTEMPT } from '../../redux/types'
import { convertMilliesToISO, getFromUserlist, getTaskFormOverflow } from '../../helpers'

export const TaskForm = () => {
  const dispatch = useDispatch()

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [overflow, setOverflow] = useState(false)
  const [status, setStatus] = useState('New')
  const [comments, setComments] = useState([])
  const [assigned, setAssigned] = useState(null)
  const [anyChanges, setAnyChanges] = useState(false)

  const { userlist } = useSelector((store) => store.app)
  const { tasks, selectedTaskId } = useSelector((store) => store.task)

  const selectedTask = tasks.filter((task) => task.id === selectedTaskId)[0]
  const { name, description, creator, id, deadline } = selectedTask

  useEffect(() => {
    const { status, comments, assigned } = selectedTask
    setStatus(status)
    setComments(comments)
    setAssigned(assigned)
  }, [selectedTask, tasks])

  useEffect(() => {
    const resizer = () => {
      const { width, height, overflow } = getTaskFormOverflow()
      setOverflow(overflow)
      setWidth(width)
      setHeight(height)
    }

    resizer()
    window.addEventListener('resize', resizer)
    return () => window.removeEventListener('resize', resizer)
  }, [comments])

  useEffect(() => {
    const statusChanged = selectedTask.status !== status
    const assignedChanged = selectedTask.assigned !== assigned
    const commentsChanged = JSON.stringify(selectedTask.comments) !== JSON.stringify(comments)
    const anyChanges = statusChanged || commentsChanged || assignedChanged

    setAnyChanges(anyChanges)
  }, [comments, status, assigned, selectedTask])

  const onChangeStatus = (status) => setStatus(status)
  const onChangeUser = (uid) => setAssigned(uid)

  const onSubmitComment = (comment) => {
    const newComments = [...comments]
    newComments.push(comment)
    setComments(newComments)
  }

  const submitHandler = () => {
    const task = {
      lastmodified: new Date().getTime(),
      comments,
      status,
      assigned
    }
    dispatch({
      type: SAVE_TASK_ATTEMPT,
      payload: { id, task }
    })
  }

  const deleteHandler = () => {
    const alert = window.confirm('Delete task?')
    alert &&
      dispatch({
        type: DELETE_TASK_ATTEMPT,
        payload: { id: selectedTaskId }
      })
  }

  const cancelHandler = () => {
    dispatch({
      type: SELECT_TASK,
      payload: null
    })
  }

  return (
    <>
      <div className="task__container" style={{ height }}>
        <div className="task__split-left" style={{ width }}>
          <div className="info-card">Name: {name}</div>
          <div className="info-card">Description: {description}</div>
          <div className="info-card">Created by: {getFromUserlist({ userlist, uid: creator })}</div>
          <div className="info-card">Assigned: {getFromUserlist({ userlist, uid: assigned })}</div>
          <div className="info-card">Deadline: {convertMilliesToISO(deadline).readableTime}</div>
          <DropdownStatus value={status} onChange={onChangeStatus} />
          <DropdownUser value={assigned} assigned={assigned} onChange={onChangeUser} />
        </div>
        <div
          className="task__split-right"
          style={{ width: overflow ? 'calc(50% - 25px' : 'calc(50% - 5px)' }}
        >
          <Comments comments={comments} onSubmitComment={onSubmitComment} />
        </div>
      </div>
      <div className="task__delete">
        <Button onClick={submitHandler} disabled={!anyChanges}>
          {anyChanges ? 'Submit' : 'No Changes'}
        </Button>
        <Button onClick={deleteHandler}>Delete Task</Button>
      </div>
      <Button onClick={cancelHandler}>Cancel</Button>
    </>
  )
}
