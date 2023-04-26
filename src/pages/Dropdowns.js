import React from 'react'
import { Select } from '../UI'
import { useAppContext } from '../context/Context'

export const Dropdowns = () => {
  const { contextAssigned, contextStatus, setContextAssigned, setContextStatus } = useAppContext()

  const handleUserChange = (value) => {
    setContextAssigned(value)
  }

  const handleStatusChange = (value) => {
    setContextStatus(value)
  }

  return (
    <div className="flexrow">
      <div className="selector flexcol">
        <Select value={contextAssigned} variant="users" onChange={handleUserChange} label="Assign User" />
      </div>
      <div className="selector flexcol">
        <Select value={contextStatus} variant="status" onChange={handleStatusChange} label="Set Status" />
      </div>
    </div>
  )
}
