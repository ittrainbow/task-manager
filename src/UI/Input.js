import React from 'react'
import { TextField } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { darkTheme } from './themes'

export const Input = ({ label, value, onChange, type, multiline, minRows, comments }) => {
  const classes = comments ? 'comments__new' : ''

  return (
    <ThemeProvider theme={darkTheme}>
      <TextField
        className={classes}
        type={type}
        multiline={multiline}
        minRows={minRows || 3}
        label={label}
        value={value}
        variant="outlined"
        onChange={onChange}
      />
    </ThemeProvider>
  )
}
