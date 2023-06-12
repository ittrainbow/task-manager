// import * as React from 'react'
// import { Alert } from '@mui/material/'
import { ErrorOutlineOutlined } from '@mui/icons-material'
import { ThemeProvider } from '@mui/system'
import { darkTheme } from './themes'

export const CommentsAlert = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <div className="message-alert-icon">
          <ErrorOutlineOutlined />
        </div>
        <div className="header__greeting">Unsaved messages</div>
      </>
    </ThemeProvider>
  )
}
