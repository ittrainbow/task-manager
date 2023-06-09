// import React from 'react'
import { Button as MUIButton } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { darkTheme } from './themes'

interface ButtonProps {
  onClick: any // TODO
  label: string
  disabled?: boolean
  width?: number | undefined
}

export const Button = ({ onClick, disabled, label, width }: ButtonProps) => {
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
