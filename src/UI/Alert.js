import * as React from 'react'
import { Alert } from '@mui/material/'
import { ThemeProvider } from '@mui/system'
import { darkTheme } from './themes'

export const CommentsAlert = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flexrow">
        <Alert className="alert__icon" severity="info" sx={{ padding: 0 }}></Alert>
        <div className="alert__text">Unsaved messages</div>
      </div>
    </ThemeProvider>
  )
}
