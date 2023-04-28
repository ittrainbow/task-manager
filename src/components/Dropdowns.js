import React from 'react'
import { Select } from '.'
import { useAppContext } from '../context/Context'

export const Dropdowns = () => {
  const { assigned, status, setAssigned, setStatus } = useAppContext()

  return (
    <div className="selector__container">
      <div className="selector__div">
        <Select
          value={assigned}
          variant="users"
          onChange={(value) => setAssigned(value)}
          label="Assign User"
        />
      </div>
      <div className="selector__div">
        <Select
          value={status}
          variant="status"
          onChange={(value) => setStatus(value)}
          label="Set Status"
        />
      </div>
    </div>
  )
}
