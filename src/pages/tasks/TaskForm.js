import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import { DropdownStatus, DropdownUser, Comments } from '../../UI'
import { selectApp, selectTask, selectCurrentTask } from '../../redux/selectors'
import {
  SAVE_TASK_ATTEMPT,
  SELECT_TASK,
  DELETE_TASK_ATTEMPT,
  LISTENER_START,
  LISTENER_STOP
} from '../../redux/types'
import { convertMilliesToISO, getFromUserlist, getTaskFormOverflow, emptyTask } from '../../helpers'

export const TaskForm = () => {
  const dispatch = useDispatch()

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [status, setStatus] = useState(null)
  const [assigned, setAssigned] = useState(null)
  const [overflow, setOverflow] = useState(false)
  const [anyChanges, setAnyChanges] = useState(false)
  const [yourComments, setYourComments] = useState([])

  const { userlist } = useSelector(selectApp)
  const { tasks, selectedTaskId, lastUpdate } = useSelector(selectTask)
  const selectedTask = useSelector(selectCurrentTask) || emptyTask()

  const { name, description, creator, id, deadline, comments } = selectedTask
  const commentsList = [...comments, ...yourComments]

  const listenerStart = () => {
    const time = new Date().getTime()
    dispatch({
      type: LISTENER_START,
      payload: { time, id: selectedTaskId }
    })
  }

  const listenerStop = () => dispatch({ type: LISTENER_STOP })

  useEffect(() => {
    listenerStart()
    return () => listenerStop()
    // eslint-disable-next-line
  }, [selectedTaskId])

  useEffect(() => {
    const { status, assigned } = selectedTask
    setStatus(status)
    setAssigned(assigned)
  }, [selectedTask, tasks])

  useEffect(() => {
    if (lastUpdate) {
      listenerStop()
      toast.success('Task data was silently updated')
      listenerStart()
    }
    // eslint-disable-next-line
  }, [lastUpdate])

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
    const commentsChanged = JSON.stringify(selectedTask.comments) !== JSON.stringify(commentsList)
    const anyChanges = statusChanged || commentsChanged || assignedChanged

    setAnyChanges(anyChanges)
    // eslint-disable-next-line
  }, [yourComments, status, assigned, selectedTask])

  const onChangeStatus = (status) => setStatus(status)
  const onChangeUser = (uid) => setAssigned(uid)

  const onSubmitComment = (comment) => {
    const newComments = [...yourComments]
    newComments.push(comment)
    setYourComments(newComments)
  }

  const submitHandler = () => {
    const task = {
      lastmodified: new Date().getTime(),
      comments: commentsList,
      status,
      id,
      assigned
    }
    dispatch({
      type: SAVE_TASK_ATTEMPT,
      payload: { task }
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
          style={{ width: overflow ? 'calc(50% - 18px)' : 'calc(50% - 5px)' }}
        >
          <Comments comments={commentsList} onSubmitComment={onSubmitComment} />
        </div>
      </div>
      <div className="task__delete">
        <Button onClick={submitHandler} disabled={!anyChanges}>
          {anyChanges ? 'Submit' : 'No Changes'}
        </Button>
        <Button onClick={deleteHandler}>Delete Task</Button>
      </div>
      <Button onClick={cancelHandler}>Cancel</Button>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" pauseOnHover={false} />
    </>
  )
}
