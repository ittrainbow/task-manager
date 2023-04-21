import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Picker, DropdownMenu, Comments } from '../../UI'
import {
  REMOVE_TASK_FROM_WORK,
  SAVE_TASK_ATTEMPT,
  SET_NEW_TASK
} from '../../redux/types'

export const TaskForm = () => {
  const getTime = () => new Date().getTime()
  const { uid } = useSelector((store) => store.user)
  const { task, newTask, newTaskId } = useSelector((store) => store.task)

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
  const onChangeUser = (uid) => setAppointed(uid)

  const onChangeDeadline = ({ value }) => {
    const time = new Date(value).getTime()
    setDeadline(time)
  }

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

  const newTaskHandler = () => {
    dispatch({
      type: SET_NEW_TASK,
      payload: { uid }
    })
  }

  const cancelHandler = () => {
    dispatch({
      type: REMOVE_TASK_FROM_WORK
    })
    // dispatch({ type: SET_LOADING })
  }

  return (
    <div className="task__container">
      {!task ? (
        <></>
        // <Button onClick={newTaskHandler}>New Task</Button>
      ) : (
        <>
          <div className="task__split">
            {newTask ? (
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task name"
              />
            ) : (
              <div style={{ textAlign: 'left' }}>Name: {name}</div>
            )}
            {newTask ? (
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            ) : (
              <div style={{ textAlign: 'left' }}>Description: {description}</div>
            )}
            <div className="task__dropdowns">
              <DropdownMenu value={status} statusSelector={true} onChange={onChangeStatus} />
              {uid && (
                <DropdownMenu
                  value={appointed}
                  statusSelector={false}
                  appointed={appointed}
                  onChange={onChangeUser}
                />
              )}
            </div>
            <Picker onChange={(e) => onChangeDeadline(e.target)} value={deadline} />
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
