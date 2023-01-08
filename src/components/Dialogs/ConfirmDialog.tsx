import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface DialogProps {
  toggleDialog: () => void
  open: boolean
  title: string
  body: string
  onConfirm: () => void
  isLoading: boolean
}

const ConfirmDialog: React.FC<DialogProps> = ({
  toggleDialog,
  open,
  title,
  body,
  onConfirm,
  isLoading,
}) => {
  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={toggleDialog} variant='outlined'>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={onConfirm}
          color='success'
          variant='contained'
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
