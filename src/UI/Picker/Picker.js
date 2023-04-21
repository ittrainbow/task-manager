import React from 'react'
import moment from 'moment/moment'

import './Picker.scss'

export const Picker = ({ onChange, value }) => {
  const convertedValue = moment(value).format().substring(0, 16)
  return (
    <div>
      <input className='picker' type={'datetime-local'} value={convertedValue} onChange={onChange}/>
    </div>
  )
}
