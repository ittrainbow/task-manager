import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { TaskNew, TaskForm } from '.'
import { SELECT_TASK } from '../../redux/types'

export const Task = () => {
  const dispatch = useDispatch()
  const { selectedTaskId, newTask, newTaskId } = useSelector((store) => store.task)

  const newTaskHandler = () => {
    dispatch({
      type: SELECT_TASK,
      payload: { id: newTaskId }
    })
  }

  const showNewTaskButton = () => {
    return selectedTaskId === null ? <Button onClick={newTaskHandler}>New Task</Button> : ''
  }

  const showTask = () => {
    if (selectedTaskId !== null) {
      if (selectedTaskId === newTaskId) return <TaskNew />
      return <TaskForm />
    }
  }

  return (
    <div className="task">
      <div className="tasklist__header">{newTask ? 'New Task' : 'Task'}</div>
      {showNewTaskButton()}
      {showTask()}
    </div>
  )
}
