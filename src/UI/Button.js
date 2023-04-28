import React from 'react'
import { Button as MUIButton } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { darkTheme } from './themes'

export const Button = ({ onClick, disabled, label, width }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MUIButton
        variant="outlined"
        onClick={onClick}
        disabled={disabled}
        sx={{
          width: width || '100%',
          cursor: 'pointer',
          '&.Mui-disabled': {
            background: '#484c53',
            color: '#ddd'
          }
        }}
      >
        {label}
      </MUIButton>
    </ThemeProvider>
  )
}
