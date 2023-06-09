import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  taskListName,
  sortTaskList,
  getFromUserlist,
  getOverflow,
  convertTime
} from '../../helpers'
import { Select } from '../../components'
import { SELECT_TASK, SET_TASK_SORT } from '../../redux/types'
import { selectApp, selectTask, selectUser } from '../../redux/selectors'
import { useAppContext } from '../../context/Context'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [overflow, setOverflow] = useState(false)
  const [list, setList] = useState([])
  const { setSelectedTaskIsOnList, selectedTab, setSelectedTab, unsavedTasksIDs } = useAppContext()
  const { tasks, selectedTaskId, taskSort, newTask } = useSelector(selectTask)
  const { uid } = useSelector(selectUser)
  const { userlist } = useSelector(selectApp)

  const today = new Date().getTime()

  const animateCardPress = () => {
    const card = document.querySelector('.tasklist__card-selected')
    card && card.classList.add('animate-card-press')
  }

  useEffect(() => {
    setTimeout(() => selectedTab === 0 && animateCardPress(), 20)
  }, [selectedTab, selectedTaskId])

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow('tasks'))

    setTimeout(() => paddingHelper(), 20)
    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper) // eslint-disable-next-line
  }, [taskSort])

  useEffect(() => {
    const list = sortTaskList({ taskSort, tasks, uid, unsavedTasksIDs })
    setList(list)

    const selectedTaskIsOnList = list && list.some((task) => task.id === selectedTaskId)
    setSelectedTaskIsOnList(selectedTaskIsOnList) // eslint-disable-next-line
  }, [taskSort, selectedTaskId, unsavedTasksIDs])

  const taskSelectHandler = (id) => {
    const setId = id === selectedTaskId && !newTask ? null : id
    localStorage.setItem('lastTaskId', setId)
    dispatch({
      type: SELECT_TASK,
      payload: setId
    })
    setSelectedTab(0)
  }

  const onChangeSort = (value) => {
    dispatch({
      type: SET_TASK_SORT,
      payload: value
    })
  }

  const getCardClass = (id) => {
    return newTask
      ? 'tasklist__card-selected-grey flexcol'
      : id !== selectedTaskId
      ? 'tasklist__card flexcol'
      : 'tasklist__card-selected flexcol'
  }

  return (
    <div className="tasklist flexcol">
      <div className="tasks-header">Task List</div>
      <Select variant="sort" value={taskSort} onChange={onChangeSort} label="Select Sort" />
      <div className="tasklist__container flexcol" style={{ paddingRight: overflow ? 5 : 0 }}>
        {list &&
          list.map((el, index) => {
            const { name, creator, assigned, status, id, deadline } = el
            const outdated = deadline < today
            return (
              <div key={index} className={getCardClass(id)} onClick={() => taskSelectHandler(id)}>
                <div>Name: {taskListName(name)}</div>
                <div>
                  {getFromUserlist({ userlist, uid: creator })} assigned to{' '}
                  {getFromUserlist({ userlist, uid: assigned })}
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
