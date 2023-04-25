import React, { useState, useContext} from 'react'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState(false)

  return (
    <Context.Provider
      value={{
        selectedTaskIsOnList,
        setSelectedTaskIsOnList
      }}
    >
      {children}
    </Context.Provider>
  )
}
