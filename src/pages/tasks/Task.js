import React from 'react'
import { useSelector } from 'react-redux'

import { TaskNew, TaskForm } from '.'
import { selectTask } from '../../redux/selectors'

export const Task = () => {
  const { selectedTaskId, newTask } = useSelector(selectTask)

  return (
    <div className="task">
      <div className="task__header">{newTask ? 'New Task' : 'Task'}</div>
      {newTask ? <TaskNew /> : selectedTaskId !== null ? <TaskForm /> : 'No task selected'}
    </div>
  )
}
