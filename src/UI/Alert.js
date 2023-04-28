import * as React from 'react'
import { Alert, Stack } from '@mui/material/'
import { ThemeProvider } from '@mui/system'
import { darkTheme } from './themes'

export const CommentsAlert = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack sx={{ width: '100%', maxHeight: '35px' }}>
        <Alert className='alert__inner' severity="info">
          Unsaved comments
        </Alert>
      </Stack>
    </ThemeProvider>
  )
}
