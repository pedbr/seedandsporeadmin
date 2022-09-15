import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface DeleteDialogProps {
  toggleDialog: () => void
  open: boolean
  entity: string
  entityType: string
  onDelete: () => void
  isDeleting: boolean
}

const DeleteDialog = ({
  toggleDialog,
  open,
  entity,
  entityType,
  onDelete,
  isDeleting,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle id='alert-dialog-title'>{`Delete ${entity}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`Are you sure you wish to delete this ${entityType}? This action is
            permanent and will delete all the ${entityType}'s information.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDeleting} onClick={toggleDialog} variant='outlined'>
          Cancel
        </Button>
        <Button
          disabled={isDeleting}
          onClick={onDelete}
          color='error'
          variant='contained'
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
