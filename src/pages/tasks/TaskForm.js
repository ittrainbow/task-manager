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
  const [appointed, setAppointed] = useState(null)
  const [stretch, setStretch] = useState(false)
  const [anyChanges, setAnyChanges] = useState(false)

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

  useEffect(() => {
    const taskContainerHeight = document.querySelector('.task__container').clientHeight
    const innerHeight = window.innerHeight - 210
    const toStretch = innerHeight < taskContainerHeight

    setStretch(toStretch)
  }, [comments])

  useEffect(() => {
    const task = tasks.filter((task) => task.id === selectedTaskId)[0]
    const statusChanged = task.status !== status
    const appointmentChanged = task.appointed !== appointed
    const commentsChanged = JSON.stringify(task.comments) !== JSON.stringify(comments)
    setAnyChanges(statusChanged || commentsChanged || appointmentChanged) // eslint-disable-next-line
  }, [comments, status, appointed])

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
        appointed,
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
    const openedby = creator && getFromUserlist({ userlist, uid: creator })
    const responsible = appointed && getFromUserlist({ userlist, uid: appointed })
    const { readableTime } = convertMilliesToISO(deadline)

    return (
      <>
        <div className="info-card">Name: {name}</div>
        <div className="info-card">Description: {description}</div>
        <div className="info-card">Opened by: {openedby}</div>
        <div className="info-card">Responsible: {appointed ? responsible : 'nobody'}</div>
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

  const getTaskClasses = () => {
    const classes = [`task__container`]
    classes.push(stretch ? 'task__stretched' : 'task__non-stretched')
    return classes.join(' ')
  }

  const onChangeUser = (uid) => {
    setAppointed(uid)
  }

  return (
    <>
      <div className={getTaskClasses()}>
        <div className="task__split-left">
          {renderInfoCards()}
          <DropdownStatus value={status} onChange={onChangeStatus} />
          <DropdownUser value={appointed} appointed={appointed} onChange={onChangeUser} />
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
