import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownStatus, DropdownUser, Comments } from '../../UI'
import { SAVE_TASK_ATTEMPT, SELECT_TASK, DELETE_TASK_ATTEMPT } from '../../redux/types'
import { convertMilliesToISO, getFromUserlist } from '../../helpers'

const getTime = () => new Date().getTime()

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { userlist } = useSelector((store) => store.app)
  const { tasks, selectedTaskId, newTaskId } = useSelector((store) => store.task)
  const [id, setId] = useState(newTaskId)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(getTime)
  const [status, setStatus] = useState('New')
  const [comments, setComments] = useState([])
  const [creator, setCreator] = useState(null)
  const [assigned, setAssigned] = useState(null)
  const [anyChanges, setAnyChanges] = useState(false)

  useEffect(() => {
    if (selectedTaskId || selectedTaskId === 0) {
      const task = tasks.filter((task) => task.id === selectedTaskId)[0]
      const { name, description, deadline, status, comments, creator, assigned, id } = task

      setName(name)
      setDescription(description)
      setDeadline(deadline)
      setStatus(status)
      setComments(comments)
      setCreator(creator)
      setAssigned(assigned)
      setId(id)
    } // eslint-disable-next-line
  }, [selectedTaskId])

  useEffect(() => {
    const task = tasks.filter((task) => task.id === selectedTaskId)[0]
    const statusChanged = task.status !== status
    const assignedChanged = task.assigned !== assigned
    const commentsChanged = JSON.stringify(task.comments) !== JSON.stringify(comments)
    setAnyChanges(statusChanged || commentsChanged || assignedChanged) // eslint-disable-next-line
  }, [comments, status, assigned])

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
        lastmodified: new Date().getTime(),
        comments,
        name,
        description,
        deadline,
        status,
        assigned,
        id
      }
      dispatch({
        type: SAVE_TASK_ATTEMPT,
        payload: { id, task }
      })
    }
  }

  const deleteHandler = () => {
    const alert = window.confirm('Delete task?')
    alert &&
      dispatch({
        type: DELETE_TASK_ATTEMPT,
        payload: { id: selectedTaskId }
      })
  }

  const renderInfoCards = () => {
    const openedBy = creator && getFromUserlist({ userlist, uid: creator })
    const assignedUser = assigned && getFromUserlist({ userlist, uid: assigned })
    const { readableTime } = convertMilliesToISO(deadline)

    return (
      <>
        <div className="info-card">Name: {name}</div>
        <div className="info-card">Description: {description}</div>
        <div className="info-card">Opened by: {openedBy}</div>
        <div className="info-card">Assigned: {assigned ? assignedUser : 'not assigned'}</div>
        <div className="info-card">Deadline: {readableTime}</div>
      </>
    )
  }

  const cancelHandler = () => {
    dispatch({
      type: SELECT_TASK,
      payload: null
    })
  }

  const onChangeUser = (uid) => {
    setAssigned(uid)
  }

  return (
    <>
      <div className="task__container">
        <div className="task__split">
          {renderInfoCards()}
          <DropdownStatus value={status} onChange={onChangeStatus} />
          <DropdownUser value={assigned} assigned={assigned} onChange={onChangeUser} />
        </div>
        <div className="task__split">
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
