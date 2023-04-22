import React from 'react'
import { useSelector } from 'react-redux'

import { TaskNew, TaskForm } from '.'

export const Task = () => {
  const { selectedTaskId, newTask, newTaskId } = useSelector((store) => store.task)

  return (
    <div className="task">
      <div className="task__header">{newTask ? 'New Task' : 'Task'}</div>
      {selectedTaskId !== null ? selectedTaskId === newTaskId ? <TaskNew /> : <TaskForm /> : null}
    </div>
  )
}
