import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { taskListName, getFromUserlist, getOverflow, convertTime } from '../helpers'
import { selectApp, selectTask } from '../redux/selectors'
import { SELECT_TASK } from '../redux/types'
import { DropdownSort } from '../UI'
import { useSort } from '../hooks'

export const TaskList = () => {
  const dispatch = useDispatch()
  const { selectedTaskId, taskSort, newTask } = useSelector(selectTask)
  const { userlist } = useSelector(selectApp)
  const [overflow, setOverflow] = useState<boolean>(false)

  const today = new Date().getTime()
  const list = useSort()

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow('tasks'))
    paddingHelper()

    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper)
  }, [taskSort])

  const getCardClass = newTask ? 'tasklist__card-selected-grey flexcol' : 'tasklist__card flexcol'

  const taskSelectHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget
    const setId = id === selectedTaskId && !newTask ? '' : id

    localStorage.setItem('lastTaskId', setId.toString())
    dispatch({ type: SELECT_TASK, payload: { selectedTaskId: setId } })

    const card = document.getElementById(id) as HTMLElement
    card.classList.add('animate-card-press')
    setTimeout(() => card.classList.remove('animate-card-press'), 250)
  }

  return (
    <div className="tasklist flexcol">
      <div className="tasks-header">Task List</div>
      <DropdownSort />
      <div className="tasklist__container flexcol" style={{ paddingRight: overflow ? 5 : 0 }}>
        {list.map((el) => {
          const { name, creator, assigned, status, _id, deadline } = el
          const outdated = deadline < today
          return (
            <div key={_id} className={getCardClass} id={_id} onClick={taskSelectHandler}>
              <div>Name: {taskListName(name)}</div>
              <div>
                {getFromUserlist({ userlist, _id: creator })} assigned to{' '}
                {getFromUserlist({ userlist, _id: assigned || '' })}
              </div>
              <div>Status: {status}</div>
              <div style={{ color: outdated && status !== 'Closed' ? '#f75' : '' }}>
                {outdated ? 'Expired' : 'Deadline'}: {convertTime(deadline)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
