import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from 'react-pro-sidebar';
import { GrClear } from "react-icons/gr";

function ClearDialog({onClear}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    const handleSuccessClose = ()=>{
        onClear();
        setOpen(false);
    }

  return (
    <React.Fragment>
    <MenuItem onClick={handleClickOpen} icon={<GrClear />}>Clear</MenuItem>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Clear board?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure? you will lose the work done.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No, go back</Button>
        <Button onClick={handleSuccessClose} autoFocus>
          Yes,i'm sure
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  )
}

export default ClearDialog