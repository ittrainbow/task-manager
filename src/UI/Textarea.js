import React from 'react'
import { TextareaAutosize } from '@mui/base'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Textarea from '@mui/joy/Textarea'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export const TextArea = ({ value, onChange, label }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Textarea
        className="tasknew__description"
        value={value}
        minRows={2}
        onChange={onChange}
        placeholder="Task description"
      />
    </ThemeProvider>
  )
}
