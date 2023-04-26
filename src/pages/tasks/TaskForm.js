import React, { useState, useEffect } from 'react'
import { Button, Select } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import { Comments, DrawModal } from '../../UI'
import { selectApp, selectTask, selectCurrentTask } from '../../redux/selectors'
import {
  SAVE_TASK_ATTEMPT,
  SELECT_TASK,
  DELETE_TASK_ATTEMPT,
  LISTENER_START,
  LISTENER_STOP
} from '../../redux/types'
import { convertMilliesToISO, getFromUserlist, emptyTask, getTaskFormOverflow } from '../../helpers'

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { userlist } = useSelector(selectApp)
  const { selectedTaskId, lastUpdate } = useSelector(selectTask)
  const selectedTask = useSelector(selectCurrentTask) || emptyTask()

  const [height, setHeight] = useState(0)
  const [widthLeft, setWidthLeft] = useState(100)
  const [widthRight, setWidthRight] = useState(100)
  const [drawModal, setDrawModal] = useState(false)
  const [status, setStatus] = useState()
  const [assigned, setAssigned] = useState('')
  const [deadline, setDeadline] = useState()
  const [anyChanges, setAnyChanges] = useState(false)
  const [yourComments, setYourComments] = useState([])

  const { name, description, creator, id, comments } = selectedTask
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
    const { status, assigned, deadline } = selectedTask
    setStatus(status)
    setAssigned(assigned)
    setDeadline(deadline)
    setYourComments([])
  }, [selectedTask])

  const resizer = () => {
    const { windowHeight, width, overflow} = getTaskFormOverflow()

    setHeight(windowHeight)
    setWidthLeft(width)
    setWidthRight(overflow ? width - 30 : width)
  }

  useEffect(() => {
    let timeout

    const handleResize = () => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        resizer()
      }, 250)
    }

    resizer()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [yourComments])

  useEffect(() => {
    if (lastUpdate) {
      listenerStop()
      toast.success('Task data was silently updated')
      listenerStart()
    }
    // eslint-disable-next-line
  }, [lastUpdate])

  useEffect(() => {
    const statusChanged = selectedTask.status !== status
    const assignedChanged = selectedTask.assigned !== assigned
    const deadlineChanged = selectedTask.deadline !== deadline
    const commentsChanged = JSON.stringify(selectedTask.comments) !== JSON.stringify(commentsList)
    const anyChanges = statusChanged || commentsChanged || assignedChanged || deadlineChanged

    setAnyChanges(anyChanges)
    // eslint-disable-next-line
  }, [yourComments, status, assigned, selectedTask, deadline])

  const onChangeStatus = (value) => setStatus(value)

  const onChangeUser = (value) => setAssigned(value)

  const onSubmitComment = (comment) => {
    const newComments = [...yourComments]
    newComments.push(comment)
    setYourComments(newComments)
  }

  const onDeleteComment = (index) => {
    const newComments = [...yourComments]
    newComments.splice(index, 1)
    setYourComments(newComments)
  }

  const outdated = () => new Date().getTime() > deadline

  const submitHandler = () => {
    const task = {
      lastmodified: new Date().getTime(),
      comments: commentsList,
      status,
      deadline,
      id,
      assigned
    }
    dispatch({
      type: SAVE_TASK_ATTEMPT,
      payload: { task }
    })
  }

  const deleteHandler = () => {
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
      <div className="task__container flexcol" style={{ height }}>
        <div className="flexrow">
          <div className="selector flexcol">
            <Select value={assigned} variant="users" onChange={onChangeUser} label="Assign User" />
          </div>
          <div className="selector flexcol">
            <Select value={status} variant="status" onChange={onChangeStatus} label="Set Status" />
          </div>
        </div>
        <div className="flexrow">
          <div className="task__split-left" style={{ minWidth: widthLeft }}>
            <div className="flexcol">
              <div className="info-card">Name: {name}</div>
              <div className="info-card">Description: {description}</div>
              <div className="info-card">
                Created by: {getFromUserlist({ userlist, uid: creator })}
              </div>
              <div className="info-card">
                Assigned to: {getFromUserlist({ userlist, uid: assigned })}
              </div>
              <div className="info-card">
                {outdated() ? 'Expired' : 'Deadline'}: {convertMilliesToISO(deadline)}
              </div>
              <div className="flexrow">
                <Button
                  variant="contained"
                  onClick={() => setDeadline(deadline - 10800000)}
                  value="-3 hr"
                />
                <Button
                  variant="contained"
                  onClick={() => setDeadline(deadline + 10800000)}
                  value="+3 hr"
                />
                <Button
                  variant="contained"
                  onClick={() => setDeadline(deadline + 86400000)}
                  value="+1 day"
                />
              </div>
            </div>
          </div>
          <div className="task__split-right" style={{ width: widthRight }}>
            <Comments
              listOne={comments}
              listTwo={yourComments}
              onSubmitComment={onSubmitComment}
              onDeleteComment={onDeleteComment}
            />
          </div>
        </div>
      </div>
      <div className="tasks-footer flexrow">
        <Button
          variant="contained"
          onClick={submitHandler}
          disabled={!anyChanges}
          value={anyChanges ? 'Submit' : 'No Changes'}
        />
        <Button variant="contained" onClick={() => setDrawModal(true)} value="Delete task" />
        <Button variant="contained" onClick={cancelHandler} value="Cancel" />
      </div>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" pauseOnHover={false} />
      <DrawModal drawModal={drawModal} setDrawModal={setDrawModal} onDelete={deleteHandler} />
    </>
  )
}
