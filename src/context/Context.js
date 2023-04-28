import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import { selectTask, selectUser } from '../redux/selectors'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const { uid } = useSelector(selectUser)
  const { selectedTaskId } = useSelector(selectTask)
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)
  const [newComments, setNewComments] = useState({})
  const [tempComments, setTempComments] = useState({})

  const setComments = (comment) => {
    const tempObject = { ...newComments }
    const tempComments = tempObject[selectedTaskId] || []
    tempComments.push(comment)
    tempObject[selectedTaskId] = tempComments
    setNewComments(tempObject)
  }

  const deleteComments = (index) => {
    const tempObject = { ...newComments }
    const tempComments = tempObject[selectedTaskId]
    tempComments.splice(index, 1)
    if (tempComments.length) tempObject[selectedTaskId] = tempComments
    else delete tempObject[selectedTaskId]
    setNewComments(tempObject)
  }

  const setTempComment = (value) => {
    const tempObject = { ...tempComments }
    tempObject[selectedTaskId] = value
    setTempComments(tempObject)
  }

  const cleanCommentsOnSave = () => {
    const tempObject = { ...newComments }
    delete tempObject[selectedTaskId]
    setNewComments(tempObject)
  }

  const gotNewComments = Object.keys(newComments).length

  const unsavedTasksIDs = Object.keys(newComments) || []

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
        cleanCommentsOnSave,
        gotNewComments,
        unsavedTasksIDs
      }}
    >
      {children}
    </Context.Provider>
  )
}
