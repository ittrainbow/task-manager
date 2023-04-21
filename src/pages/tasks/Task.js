import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { TaskNew, TaskForm } from '.'
import { SET_TASK_CREATION, TOGGLE_NEW_TASK } from '../../redux/types'

export const Task = () => {
  const dispatch = useDispatch()
  const { newTask } = useSelector((store) => store.task)
  console.log('newTask', newTask)

  const newTaskHandler = () => {
    dispatch({
      type: TOGGLE_NEW_TASK,
      payload: true
    })
  }

  return (
    <div className="task">
      <div className="tasklist__header">{newTask ? 'New Task' : 'Task'}</div>
      <>
        {newTask ? '' : <Button onClick={newTaskHandler}>New Task</Button>}
        {newTask ? <TaskNew /> : <TaskForm />}
      </>
    </div>
  )
}
