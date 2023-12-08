import { Dispatch, SetStateAction } from 'react'
import { Dialog } from '@mui/material/'
import { DialogActions } from '@mui/material/'
import { DialogContent } from '@mui/material/'
import { DialogContentText } from '@mui/material/'
import { DialogTitle } from '@mui/material/'
import { ThemeProvider } from '@mui/system'
import { Button } from './Button'

import { darkTheme } from './themes'

interface IModalProps {
  drawModal: boolean
  setDrawModal: Dispatch<SetStateAction<boolean>>
  onDelete: () => void
}

export const DrawModal = ({ drawModal, setDrawModal, onDelete }: IModalProps) => {
  const closeHandler = () => setDrawModal(false)

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={drawModal}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're going to delete this task. Do you really want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} label="Cancel" />
          <Button onClick={onDelete} label="OK" />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
