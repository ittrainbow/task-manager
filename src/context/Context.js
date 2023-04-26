import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from '../redux/selectors'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const { uid } = useSelector(selectUser)
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [status, setStatus] = useState('New')
  const [assigned, setAssigned] = useState(uid)

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
        setStatus
      }}
    >
      {children}
    </Context.Provider>
  )
}
