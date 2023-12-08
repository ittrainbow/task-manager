import { useSelector } from 'react-redux'

import { DropdownAssign, DropdownStatus } from '../../UI'
import { selectTask } from '../../redux/selectors'
import { TaskNew, TaskForm } from '../'

export const Task = () => {
  const { selectedTaskId, newTask } = useSelector(selectTask)

  return (
    <div className="task-task flexcol">
      <div className="tasks-header" id="task-header-right">
        {newTask ? 'New Task' : 'Edit Task'}
      </div>
      <div className="selector__container">
        <DropdownAssign />
        {!newTask && <DropdownStatus />}
      </div>
      {newTask ? <TaskNew /> : selectedTaskId !== '' ? <TaskForm /> : 'No task selected'}
    </div>
  )
}
