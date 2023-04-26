import React from 'react'
import { useSelector } from 'react-redux'

import { TaskNew, TaskForm } from '.'
import { selectTask } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'
import { Dropdowns } from '..'

export const Task = () => {
  const { selectedTaskIsOnList } = useAppContext()
  const { selectedTaskId, newTask } = useSelector(selectTask)

  return (
    <div className="task__container flexcol">
      <div className="tasks-header" id="task-header-right">
        {newTask ? 'New Task' : 'Edit Task'}
      </div>
      <Dropdowns />
      {newTask ? (
        <TaskNew />
      ) : selectedTaskId !== null && selectedTaskIsOnList ? (
        <TaskForm />
      ) : (
        'No task selected'
      )}
    </div>
  )
}
