import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  taskListNameHelper,
  taskListDescriptionHelper,
  convertMilliesToISO,
  sortTaskList
} from '../../helpers'
import { DropdownSort } from '../../UI/DropdownSort'
import { SELECT_TASK, SET_TASK_SORT } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [stretch, setStretch] = useState(false)
  const { tasks, selectedTaskId, taskSort } = useSelector((store) => store.task)
  const { uid } = useSelector((store) => store.user)

  const list = sortTaskList({ taskSort, tasks, uid })

  useEffect(() => {
    const tasklistContainerHeight = document.querySelector('.tasklist__container').clientHeight
    const innerHeight = window.innerHeight - 170
    const toStretch = innerHeight < tasklistContainerHeight

    setStretch(toStretch)
  }, [list])

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

  const getTasklistClasses = () => {
    const classes = [`tasklist__container`]
    classes.push(stretch ? 'tasklist__stretched' : 'tasklist__non-stretched')
    return classes.join(' ')
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <DropdownSort value={taskSort} onChange={onChangeSort} />
      <div className={getTasklistClasses()}>
        {list.map((el, index) => {
          const { name, description, status, id, deadline } = el
          const cardClass = id === selectedTaskId ? 'tasklist__card-selected' : 'tasklist__card'
          return (
            <div key={index} className={cardClass} onClick={() => taskSelectHandler(id)}>
              <div>{taskListNameHelper(name)}</div>
              <div>{taskListDescriptionHelper(description)}</div>
              <div>Deadline: {convertMilliesToISO(deadline)[`readableTime`]}</div>
              <div>Status: {status}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
