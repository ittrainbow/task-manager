import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { ErrorOutlineOutlined } from '@mui/icons-material'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface SnackProps {
  open: boolean
  snackHandler: any
  text: string
}

export const Snack = ({ open, snackHandler, text }: SnackProps) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => snackHandler(false)}
        message={text}
      >
        <Alert onClose={() => snackHandler(false)} severity="success" sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
