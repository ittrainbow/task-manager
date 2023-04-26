import React, { useState, useEffect } from 'react'
import { Button } from '../../UI'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import { Comments, DrawModal } from '../../UI'
import { selectApp, selectTask, selectCurrentTask } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'
import {
  SAVE_TASK_ATTEMPT,
  SELECT_TASK,
  DELETE_TASK_ATTEMPT,
  LISTENER_START,
  LISTENER_STOP
} from '../../redux/types'
import {
  convertMilliesToISO,
  getFromUserlist,
  emptyTask,
  getTaskFormOverflow,
  isAnyChanges
} from '../../helpers'

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { userlist } = useSelector(selectApp)
  const { selectedTaskId, lastUpdate } = useSelector(selectTask)
  const selectedTask = useSelector(selectCurrentTask) || emptyTask()
  const { assigned, setAssigned, status, setStatus } = useAppContext()

  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [overflow, setOverflow] = useState(false)
  const [drawModal, setDrawModal] = useState(false)
  const [deadline, setDeadline] = useState()
  const [anyChanges, setAnyChanges] = useState(false)
  const [yourComments, setYourComments] = useState([])

  const { name, description, creator, id, comments } = selectedTask
  const commentsList = [...comments, ...yourComments]

  const onSubmitComment = (comment) => setYourComments([...yourComments, comment])
  const outdated = () => new Date().getTime() > deadline
  const listenerStop = () => dispatch({ type: LISTENER_STOP })
  const listenerStart = () => {
    const time = new Date().getTime()
    dispatch({
      type: LISTENER_START,
      payload: { time, id: selectedTaskId }
    })
  }

  useEffect(() => {
    listenerStart()
    return () => listenerStop() // eslint-disable-next-line
  }, [selectedTaskId])

  useEffect(() => {
    const { status, assigned, deadline } = selectedTask
    setStatus(status)
    setAssigned(assigned)
    setDeadline(deadline)
    setYourComments([]) // eslint-disable-next-line
  }, [selectedTask])

  const resizer = () => {
    const { windowHeight, width, overflow } = getTaskFormOverflow()

    setHeight(windowHeight)
    setWidth(width)
    setOverflow(overflow)
  }

  useEffect(() => {
    let timeout
    const resizeHandler = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => resizer(), 250)
    }

    resizer()
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [yourComments])

  useEffect(() => {
    if (lastUpdate) {
      listenerStop()
      toast.success('Task data was silently updated')
      listenerStart()
    } // eslint-disable-next-line
  }, [lastUpdate])

  useEffect(() => {
    const anyChanges = isAnyChanges({ selectedTask, assigned, status, commentsList, deadline })
    setAnyChanges(anyChanges) // eslint-disable-next-line
  }, [yourComments, status, assigned, selectedTask, deadline])

  const onDeleteComment = (index) => {
    const newComments = [...yourComments]
    newComments.splice(index, 1)
    setYourComments(newComments)
  }

  const submitHandler = () => {
    const task = {
      lastmodified: new Date().getTime(),
      comments: commentsList,
      status,
      assigned,
      deadline,
      id
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
      <div className="task__container flexrow" style={{ height }}>
        <div className="task__split-left flexcol" style={{ width }}>
          <div className="info-card">Name: {name}</div>
          <div className="info-card">Description: {description}</div>
          <div className="info-card">Created by: {getFromUserlist({ userlist, uid: creator })}</div>
          <div className="info-card">
            Assigned to: {getFromUserlist({ userlist, uid: assigned })}
          </div>
          <hr style={{ width: 100 }} />
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
        <div className="task__split-right" style={{ width: overflow ? width - 30 : width }}>
          <Comments
            comments={comments}
            yourComments={yourComments}
            onSubmit={onSubmitComment}
            onDelete={onDeleteComment}
            overflow={overflow}
          />
        </div>
      </div>
      <div className="tasks-footer flexrow">
        <Button
          variant="contained"
          onClick={submitHandler}
          disabled={!anyChanges}
          value={!anyChanges ? 'No changes' : 'Submit'}
        />
        <Button variant="contained" onClick={() => setDrawModal(true)} value="Delete task" />
        <Button variant="contained" onClick={cancelHandler} value="Cancel" />
      </div>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" pauseOnHover={false} />
      <DrawModal drawModal={drawModal} setDrawModal={setDrawModal} onDelete={deleteHandler} />
    </>
  )
}
