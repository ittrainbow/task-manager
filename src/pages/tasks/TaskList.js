import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { taskListNameHelper, taskListDescriptionHelper } from '../../helpers'
import { SELECT_TASK } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const { task, tasks } = useSelector((store) => store.task)

  const taskSelectHandler = (id) => {
    if (!task || task.id !== id) {
      dispatch({
        type: SELECT_TASK,
        payload: { id }
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
              onClick={() => taskSelectHandler(id)}
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
