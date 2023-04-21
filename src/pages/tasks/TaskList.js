import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { taskListNameHelper, taskListDescriptionHelper } from '../../helpers'
import { GET_TASK_IN_WORK } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const { task, tasks } = useSelector((store) => store.task)
  const { uid } = useSelector((store) => store.user)

  const taskEditHandler = (id) => {
    if (!task || task.id !== id) {
      dispatch({
        type: GET_TASK_IN_WORK,
        payload: { id, uid }
      })
    }
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <div className="tasklist__container">
        {tasks.map((el, index) => {
          const { name, description, status, id } = el
          return (
            <div
              key={index}
              className="tasklist__card"
              // style={{ backgroundColor: id === task.id ? '#585c64' : '#383c44' }}
              onClick={() => taskEditHandler(id)}
            >
              <div className="tasklist__card__header">{taskListNameHelper(name)}</div>
              <div className="tasklist__card__description">
                {taskListDescriptionHelper(description)}
              </div>
              <div className="tasklist__card__status">Status: {status}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
