import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'

import { DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../../api/mutations'
import { selectApp, selectTask, selectContext } from '../../redux/selectors'
import { DrawModal, Button, ButtonSet, Loader, Comments } from '../../UI'
import { convertTime, getFromUserlist, getOverflow } from '../../helpers'
import { useComments, useChanges } from '../../hooks'
import * as TYPES from '../../redux/types'
import { TTask } from '../../interfaces'

export const TaskForm = () => {
  const dispatch = useDispatch()
  const { userlist } = useSelector(selectApp)
  const { selectedTaskId, tasks } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)
  const { status, assigned } = useSelector(selectContext)
  const [overflow, setOverflow] = useState<boolean>(false)
  const [drawModal, setDrawModal] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<number>(0)

  const selectedTask = tasks[selectedTaskId]
  const { allComments } = useComments()
  const anyChanges = useChanges({ assigned, status, deadline })

  const updateTask = {
    _id: selectedTask._id,
    assigned,
    comments: allComments,
    deadline,
    status
  }

  const [updateTaskMutation, { data: updateData, loading: updateLoading }] = useMutation(UPDATE_TASK_MUTATION)
  const [deleteTaskMutation, { data: deleteData, loading: deleteLoading }] = useMutation(DELETE_TASK_MUTATION)

  useEffect(() => {
    if (updateData) {
      const { updated } = updateData.taskUpdate
      dispatch({ type: TYPES.UPDATE_TASK_SUCCESS, payload: { ...updateTask, updated } })
    } 
    // eslint-disable-next-line
  }, [updateData])

  useEffect(() => {
    if (deleteData?.taskDelete?.deleted) {
      dispatch({ type: TYPES.DELETE_TASK_SUCCESS, payload: selectedTaskId })
    } 
    // eslint-disable-next-line
  }, [deleteData])

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow('comments'))
    paddingHelper()

    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper)
  }, [newComments, selectedTaskId])

  const outdated = () => new Date().getTime() > deadline

  useEffect(() => {
    if (tasks[selectedTaskId]) {
      const { status, assigned, deadline } = selectedTask as TTask
      dispatch({ type: TYPES.SET_STATUS, payload: { status } })
      dispatch({ type: TYPES.SET_ASSIGNED, payload: { assigned } })
      setDeadline(deadline || 0)
    } 
    // eslint-disable-next-line
  }, [selectedTaskId])

  const submitHandler = async () => selectedTask && (await updateTaskMutation({ variables: updateTask }))

  const deleteHandler = () => {
    deleteTaskMutation({ variables: { _id: selectedTaskId } })
    setDrawModal(false)
  }

  const cancelHandler = () => dispatch({ type: TYPES.SELECT_TASK, payload: '' })

  if (updateLoading || deleteLoading) return <Loader />

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
      <div className="flexrow footer">
        <Button onClick={submitHandler} disabled={!anyChanges} label="Submit" />
        <Button onClick={() => setDrawModal(true)} label="Delete task" />
        <Button onClick={cancelHandler} label="Cancel" />
      </div>
    </div>
  )
}
