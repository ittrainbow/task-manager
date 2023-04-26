import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from '../redux/selectors'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const { uid } = useSelector(selectUser)
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [contextStatus, setContextStatus] = useState('New')
  const [contextAssigned, setContextAssigned] = useState(uid)
  const [onChangeUser, setOnChangeUser] = useState(() => {})
  const [onChangeStatus, setOnChangeStatus] = useState(() => {})

  return (
    <Context.Provider
      value={{
        selectedTaskIsOnList,
        setSelectedTaskIsOnList,
        selectedTab,
        setSelectedTab,
        contextAssigned,
        setContextAssigned,
        contextStatus,
        setContextStatus,
        onChangeUser,
        setOnChangeUser,
        onChangeStatus,
        setOnChangeStatus
      }}
    >
      {children}
    </Context.Provider>
  )
}
