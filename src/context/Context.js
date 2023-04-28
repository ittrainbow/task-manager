import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectTask, selectUser } from '../redux/selectors'
import { SET_TASK_SORT } from '../redux/types'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(selectUser)
  const { selectedTaskId } = useSelector(selectTask)
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)
  const [newComments, setNewComments] = useState({})
  const [tempComments, setTempComments] = useState({})
  const [unsavedTasksIDs, setUnsavedTasksIDs] = useState([])

  const cleanCommentsOnSave = (id) => {
    const tempObject = { ...newComments }
    delete tempObject[id]
    !Object.keys(tempObject).length && resetSort()
    setNewComments(tempObject)
  }

  useEffect(() => {
    setUnsavedTasksIDs(Object.keys(newComments))
  }, [newComments])

  const setComments = (comment) => {
    const tempObject = { ...newComments }
    const tempComments = tempObject[selectedTaskId] || []
    tempComments.push(comment)
    tempObject[selectedTaskId] = tempComments
    setNewComments(tempObject)
  }

  const resetSort = () => {
    dispatch({
      type: SET_TASK_SORT,
      payload: 1
    })
  }

  const deleteComments = (index) => {
    const tempObject = { ...newComments }
    const tempComments = tempObject[selectedTaskId]
    tempComments.splice(index, 1)
    if (tempComments.length) tempObject[selectedTaskId] = tempComments
    else delete tempObject[selectedTaskId]
    if (!Object.keys(tempObject).length) {
      resetSort()
    }
    setNewComments(tempObject)
  }

  const setTempComment = (value) => {
    const tempObject = { ...tempComments }
    tempObject[selectedTaskId] = value
    setTempComments(tempObject)
  }

  const gotNewComments = Object.keys(newComments).length

  return (
    <Context.Provider
      value={{
        selectedTaskIsOnList,
        setSelectedTaskIsOnList,
        selectedTab,
        setSelectedTab,
        assigned,
        setAssigned,
        status,
        setStatus,
        newComments,
        setComments,
        deleteComments,
        tempComments,
        setTempComment,
        gotNewComments,
        unsavedTasksIDs,
        cleanCommentsOnSave
      }}
    >
      {children}
    </Context.Provider>
  )
}
