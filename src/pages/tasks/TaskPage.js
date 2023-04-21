import React from 'react'
import { useSelector } from 'react-redux'

import { TaskList, Task } from '.'
import { Loader } from '../../UI'

export const TaskPage = () => {
  const { loading } = useSelector((store) => store.app)

  return (
    <div className="task-container">
      {loading ? (
        <div className='spinner-div'>
          <Loader />
        </div>
      ) : (
        <>
          <TaskList />
          <Task />
        </>
      )}
    </div>
  )
}
