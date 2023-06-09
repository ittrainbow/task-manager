import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DrawModal, Snack, Button, ButtonSet } from '../../UI'
import { Comments } from '../../components'
import { selectApp, selectTask, selectCurrentTask, selectUser } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'
import { convertTime, getFromUserlist, isAnyChanges, getOverflow, emptyTask } from '../../helpers'
import {
  SAVE_TASK_ATTEMPT,
  SELECT_TASK,
  DELETE_TASK_ATTEMPT,
  LISTENER_START,
  LISTENER_STOP
} from '../../redux/types'

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { uid } = useSelector(selectUser)
  const { userlist } = useSelector(selectApp)
  const { selectedTaskId, lastUpdate } = useSelector(selectTask)
  const selectedTask = useSelector(selectCurrentTask) || emptyTask(uid)
  const { assigned, setAssigned, status, setStatus, newComments, cleanCommentsOnSave } =
    useAppContext()

  const [snack, setSnack] = useState<boolean>(false)
  const [overflow, setOverflow] = useState<boolean>(false)
  const [drawModal, setDrawModal] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<number>(0)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)

  const yourComments: string[] = newComments[selectedTaskId] || []

  const { name, description, creator, id, comments } = selectedTask
  const commentsList: string[] = [...comments, ...yourComments]

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow('comments'))

    setTimeout(() => paddingHelper(), 20)
    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper) // eslint-disable-next-line
  }, [newComments])

  const outdated = () => {
    return new Date().getTime() > deadline
  }

  const listenerStop = () => {
    dispatch({ type: LISTENER_STOP })
  }

  const listenerStart = () => {
    const time = new Date().getTime()
    dispatch({
      type: LISTENER_START,
      payload: { time, id: selectedTaskId }
    })
  }

  useEffect(() => {
    listenerStart()
    const { status, assigned, deadline } = selectedTask
    setStatus(status)
    setAssigned(assigned)
    setDeadline(deadline)
    return () => listenerStop() // eslint-disable-next-line
  }, [selectedTask])

  useEffect(() => {
    if (lastUpdate) {
      listenerStop()
      setSnack(true)
      listenerStart()
    } // eslint-disable-next-line
  }, [lastUpdate])

  useEffect(() => {
    setTimeout(() => {
      const anyChanges = isAnyChanges({ selectedTask, assigned, status, yourComments, deadline })
      setAnyChanges(anyChanges)
    }) // eslint-disable-next-line
  }, [yourComments, status, assigned, deadline])

  const snackHandler = (value: boolean) => {
    setSnack(value)
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
      payload: { task, cleanCommentsOnSave }
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
    <div className="task-container flexcol">
      <div className="flexrow flexrow--task">
        <div
          className="task__split-left flexcol"
          style={{
            minWidth: overflow ? 'calc(50% + 5px)' : 'calc(50% - 3px)',
            maxWidth: overflow ? 'calc(50% + 5px)' : 'calc(50% - 3px)'
          }}
        >
          <div className="info-card">Name: {name}</div>
          <div className="info-card">Description: {description}</div>
          <div className="info-card">Created by: {getFromUserlist({ userlist, uid: creator })}</div>
          <div className="info-card">
            Assigned to: {getFromUserlist({ userlist, uid: assigned })}
          </div>
          <hr style={{ width: 100 }} />
          <div className="info-card">
            {outdated() ? 'Expired' : 'Deadline'}: {convertTime(deadline)}
          </div>
          <ButtonSet deadline={deadline} setDeadline={setDeadline} variant={3} />
        </div>
        <div className="comments__container flexcol" style={{ paddingRight: overflow ? 5 : 0 }}>
          <Comments />
        </div>
      </div>
      <DrawModal drawModal={drawModal} setDrawModal={setDrawModal} onDelete={deleteHandler} />
      <Snack
        open={snack}
        snackHandler={snackHandler}
        text="Task data was fetched from server and silently updated"
      />
      <div className="flexrow footer">
        <Button
          onClick={submitHandler}
          disabled={!anyChanges}
          label={!anyChanges ? 'No changes' : 'Submit'}
        />
        <Button onClick={() => setDrawModal(true)} label="Delete task" />
        <Button onClick={cancelHandler} label="Cancel" />
      </div>
    </div>
  )
}
