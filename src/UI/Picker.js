import React from 'react'

import { convertMilliesToISO } from '../helpers'

export const Picker = ({ onChange, value }) => {
  const { ISOTime } = convertMilliesToISO(value)

  return (
    <div>
      <div className="picker-header">Pick deadline</div>
      <input
        className="picker"
        type={'datetime-local'}
        value={ISOTime}
        onChange={onChange}
      />
    </div>
  )
}
