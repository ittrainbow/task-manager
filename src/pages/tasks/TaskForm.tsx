import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectApp, selectTask, selectContext } from '../../redux/selectors'
import { convertTime, getFromUserlist, getOverflow } from '../../helpers'
import { DrawModal, Snack, Button, ButtonSet } from '../../UI'
import { useComments, useChanges } from '../../hooks'
import { TTask, TTaskUpdate } from '../../interfaces'
import * as TYPES from '../../redux/types'
import { Comments } from '../../UI'

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { userlist } = useSelector(selectApp)
  const { selectedTaskId, tasks } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)

  const { status, assigned } = useSelector(selectContext)

  const [snack, setSnack] = useState<boolean>(false)
  const [overflow, setOverflow] = useState<boolean>(false)
  const [drawModal, setDrawModal] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<number>(0)

  const selectedTask = tasks[selectedTaskId]
  const anyChanges = useChanges({ assigned, status, deadline })

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow('comments'))
    paddingHelper()

    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper)
  }, [newComments, selectedTaskId])

  const outdated = () => new Date().getTime() > deadline

  const snackTrigger = () => {
    listenerStop()
    setSnack(true)
    listenerStart()
  }

  const listenerStart = () => {
    const time = new Date().getTime()
    dispatch({ type: TYPES.LISTENER_START, payload: { selectedTaskId, time, snackTrigger } })
  }

  const listenerStop = () => {
    dispatch({ type: TYPES.LISTENER_STOP })
  }

  useEffect(() => {
    if (tasks[selectedTaskId]) {
      const { status, assigned, deadline } = selectedTask as TTask
      listenerStart()
      dispatch({ type: TYPES.SET_STATUS, payload: { status } })
      dispatch({ type: TYPES.SET_ASSIGNED, payload: { assigned } })
      setDeadline(deadline || 0)
    }
    return () => listenerStop() // eslint-disable-next-line
  }, [selectedTaskId])

  const snackCloseHandler = () => setSnack(false)

  const { allComments } = useComments()

  const submitHandler = () => {
    if (selectedTask) {
      const taskUpdate: TTaskUpdate = {
        _id: selectedTask._id,
        status,
        assigned,
        deadline,
        comments: allComments
      }
      dispatch({ type: TYPES.UPDATE_TASK, payload: taskUpdate })
    }
  }

  const deleteHandler = () => dispatch({ type: TYPES.REMOVE_TASK })

  const cancelHandler = () => {
    console.log(1)
    dispatch({ type: TYPES.SELECT_TASK, payload: '' })
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
          <div className="info-card">Name: {selectedTask?.name}</div>
          <div className="info-card">Description: {selectedTask?.description}</div>
          <div className="info-card">Created by: {getFromUserlist({ userlist, _id: selectedTask?.creator })}</div>
          <div className="info-card">Assigned to: {getFromUserlist({ userlist, _id: assigned || '' })}</div>
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
      <Snack open={snack} onClose={snackCloseHandler} text="Task data was fetched from server and silently updated" />
      <div className="flexrow footer">
        <Button onClick={submitHandler} disabled={!anyChanges} label="Submit" />
        <Button onClick={() => setDrawModal(true)} label="Delete task" />
        <Button onClick={cancelHandler} label="Cancel" />
      </div>
    </div>
  )
}
