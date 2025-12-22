import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
     <DialogTitle>Confirm Delete</DialogTitle>
     <DialogContent>
        <DialogContentText>
            Are You Sure You Want to delete this group?
        </DialogContentText>
     </DialogContent>
     <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={deleteHandler} color="error">
            Delete
        </Button>
     </DialogActions>

    </Dialog>
  )
}

export default ConfirmDeleteDialog;