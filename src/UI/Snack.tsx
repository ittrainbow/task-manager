import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface ISnackProps {
  open: boolean
  onClose: () => void
  text: string
}

export const Snack = ({ open, onClose, text }: ISnackProps) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={text}
      >
        <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
