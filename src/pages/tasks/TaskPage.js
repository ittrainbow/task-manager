import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../db/firebase'
import { TaskList, Task } from '.'
import { Loader } from '../../UI'
import { selectLoading } from '../../redux/selectors'

export const TaskPage = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    !user && navigate('/') 
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="taskpage-container">
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
