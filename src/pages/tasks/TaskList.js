import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  taskListNameHelper,
  convertMilliesToISO,
  sortTaskList,
  getFromUserlist,
  getTaskListOverflow
} from '../../helpers'
import { Dropdown } from '../../UI/'
import { SELECT_TASK, SET_TASK_SORT } from '../../redux/types'
import { selectApp, selectTask, selectUser } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [overflow, setOverflow] = useState(false)
  const [list, setList] = useState([])
  const { setSelectedTaskIsOnList } = useAppContext()
  const { tasks, selectedTaskId, taskSort, newTask } = useSelector(selectTask)
  const { uid } = useSelector(selectUser)
  const { userlist } = useSelector(selectApp)

  const today = new Date().getTime()

  useEffect(() => {
    const paddingHelper = () => setOverflow(getTaskListOverflow())

    setTimeout(() => paddingHelper(), 20)
    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper)
    // eslint-disable-next-line
  }, [taskSort])

  useEffect(() => {
    const list = sortTaskList({ taskSort, tasks, uid })
    const selectedTaskIsOnList = list.some((task) => task.id === selectedTaskId)
    setList(list)
    setSelectedTaskIsOnList(selectedTaskIsOnList)
    // eslint-disable-next-line
  }, [taskSort, selectedTaskId])

  const taskSelectHandler = (id) => {
    const setId = id === selectedTaskId ? null : id
    localStorage.setItem('lastTaskId', setId)
    dispatch({
      type: SELECT_TASK,
      payload: setId
    })
  }

  const onChangeSort = ({ value }) => {
    dispatch({
      type: SET_TASK_SORT,
      payload: value
    })
  }

  const getCardClass = (id) => {
    return id !== selectedTaskId
      ? 'tasklist__card'
      : !newTask
      ? 'tasklist__card-selected'
      : 'tasklist__card-selected-grey'
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <Dropdown variant='sort' value={taskSort} onChange={onChangeSort}/>
      <div className="tasklist__container" style={{ paddingRight: overflow ? 5 : 0 }}>
        {list.map((el, index) => {
          const { name, creator, assigned, status, id, deadline } = el
          const outdated = deadline < today
          return (
            <div key={index} className={getCardClass(id)} onClick={() => taskSelectHandler(id)}>
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
