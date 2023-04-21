import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { taskListNameHelper, taskListDescriptionHelper } from '../../helpers'
import { SELECT_TASK } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [myTasksOnly, setMyTasksOnly] = useState(true)
  const { task, tasks, selectedTaskId } = useSelector((store) => store.task)
  const { uid } = useSelector((store) => store.user)

  const taskSelectHandler = (id) => {
    if (!task || task.id !== id) {
      dispatch({
        type: SELECT_TASK,
        payload: { selectedTaskId: id }
      })
    }
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <div className="tasklist__buttons">
        <Button
          style={{ color: myTasksOnly ? '#aaa' : 'white' }}
          onClick={() => setMyTasksOnly(false)}
        >
          All tasks
        </Button>
        <Button
          style={{ color: myTasksOnly ? 'white' : '#aaa' }}
          onClick={() => setMyTasksOnly(true)}
        >
          My tasks
        </Button>
      </div>
      <div className="tasklist__container">
        {tasks
          .filter((task) => {
            return myTasksOnly ? task.appointed === uid || task.creator === uid : task
          })
          .map((el, index) => {
            const { name, description, status, id } = el
            const cardClass =
              id === selectedTaskId ? 'tasklist__card tasklist__card__selected' : 'tasklist__card'
            return (
              <div key={index} className={cardClass} onClick={() => taskSelectHandler(id)}>
                <div>{taskListNameHelper(name)}</div>
                <div>{taskListDescriptionHelper(description)}</div>
                <div>Status: {status}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
