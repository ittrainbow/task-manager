import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  taskListNameHelper,
  convertMilliesToISO,
  sortTaskList,
  getFromUserlist,
  getTasklistOverflow
} from '../../helpers'
import { DropdownSort } from '../../UI/DropdownSort'
import { SELECT_TASK, SET_TASK_SORT } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [overflow, setOverflow] = useState(false)
  const { tasks, selectedTaskId, taskSort } = useSelector((store) => store.task)
  const { uid } = useSelector((store) => store.user)
  const { userlist } = useSelector((store) => store.app)

  const list = sortTaskList({ taskSort, tasks, uid })
  const today = new Date().getTime()

  useEffect(() => {
    const paddingHelper = () => setOverflow(getTasklistOverflow())
    
    paddingHelper()
    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper)
  }, [taskSort])

  const taskSelectHandler = (id) => {
    dispatch({
      type: SELECT_TASK,
      payload: selectedTaskId !== id ? id : null
    })
  }

  const onChangeSort = ({ value }) => {
    dispatch({
      type: SET_TASK_SORT,
      payload: value
    })
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <DropdownSort value={taskSort} onChange={onChangeSort} />
      <div className="tasklist__container" style={{ paddingRight: overflow ? 10 : 0 }}>
        {list.map((el, index) => {
          const { name, creator, assigned, status, id, deadline } = el
          const cardClass = id === selectedTaskId ? 'tasklist__card-selected' : 'tasklist__card'
          const outdated = deadline < today
          return (
            <div key={index} className={cardClass} onClick={() => taskSelectHandler(id)}>
              <div>Name: {taskListNameHelper(name)}</div>
              <div>Created by: {getFromUserlist({ userlist, uid: creator })}</div>
              <div>Assigned to: {getFromUserlist({ userlist, uid: assigned })}</div>
              <div>Status: {status}</div>
              <div style={{ color: outdated && status !== 'Closed' ? '#f75' : '' }}>
                {outdated ? 'Expired' : 'Deadline'}: {convertMilliesToISO(deadline)[`readableTime`]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
