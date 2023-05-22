import React from 'react'

import '../styles/input.scss'

export const Input = ({ value, type, onChange, label, rows }) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      {rows > 1 ? (
        <textarea type={type} value={value} onChange={onChange} name="text" className="input" />
      ) : (
        <input type={type} value={value} onChange={onChange} name="text" className="input" />
      )}
      <label className={labelClass}>{label}</label>
    </div>
  )
}
