import React, { useState, useContext } from 'react'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Context.Provider
      value={{
        selectedTaskIsOnList,
        setSelectedTaskIsOnList,
        selectedTab,
        setSelectedTab
      }}
    >
      {children}
    </Context.Provider>
  )
}
