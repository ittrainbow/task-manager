import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { taskListNameHelper, taskListDescriptionHelper } from '../../helpers'
import { SELECT_TASK } from '../../redux/types'

export const TaskList = () => {
  const dispatch = useDispatch()
  const [myTasksOnly, setMyTasksOnly] = useState(true)
  const [stretch, setStretch] = useState(false)
  const { task, tasks, selectedTaskId } = useSelector((store) => store.task)
  const { uid } = useSelector((store) => store.user)

  useEffect(() => {
    const tasklistContainerHeight = document.querySelector('.tasklist__container').clientHeight
    const innerHeight = window.innerHeight - 180
    const toStretch = innerHeight < tasklistContainerHeight

    setStretch(toStretch)
  }, [myTasksOnly])

  const taskSelectHandler = (id) => {
    if (!task || task.id !== id) {
      dispatch({
        type: SELECT_TASK,
        payload: { selectedTaskId: id }
      })
    }
  }

  const getTasklistClasses = () => {
    const classes = [`tasklist__container`]
    classes.push(stretch ? 'tasklist__stretched' : 'tasklist__non-stretched')
    return classes.join(' ')
  }

  return (
    <div className="tasklist">
      <div className="tasklist__header">Task List</div>
      <div className="tasklist__buttons">
        <Button
          style={{ color: myTasksOnly ? 'white' : '#999' }}
          onClick={() => setMyTasksOnly(true)}
        >
          My tasks
        </Button>
        <Button
          style={{ color: myTasksOnly ? '#999' : 'white' }}
          onClick={() => setMyTasksOnly(false)}
        >
          All tasks
        </Button>
      </div>
      <div className={getTasklistClasses()}>
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
