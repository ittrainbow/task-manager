import * as React from 'react'
import dayjs from 'dayjs'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'

import { darkTheme } from './themes'

export const Picker = ({ value, onChange }) => {

  const changeHandler = (value) => {
    const millies = dayjs(value).valueOf()
    onChange(millies)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDateTimePicker
          value={dayjs(value)}
          onChange={changeHandler}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
