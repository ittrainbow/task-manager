import React from 'react'
import { Button as MUIButton } from '@mui/material'

export const Button = ({ onClick, disabled, value, width }) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
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
      {value}
    </MUIButton>
  )
}
