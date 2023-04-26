import React from 'react'
import { TextField } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { darkTheme } from './themes'

export const Input = ({ label, value, onChange, type, multiline }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <TextField
        type={type}
        multiline={multiline}
        maxRows={3}
        label={label}
        value={value}
        variant="outlined"
        onChange={onChange}
        sx={{
          minHeight: multiline ? 100 : 10
        }}
      />
    </ThemeProvider>
  )
}
