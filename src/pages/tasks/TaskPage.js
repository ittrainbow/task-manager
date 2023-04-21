import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TaskList, Task } from '.'
import { Loader } from '../../UI'

export const TaskPage = () => {
  const navigate = useNavigate()
  const { loading } = useSelector((store) => store.app)
  const { uid } = useSelector((store) => store.user)

  useEffect(() => {
    !uid && navigate('/login') // eslint-disable-next-line
  }, [])

  return (
    <div className="task-container">
      {loading ? (
        <div className="spinner-div">
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
