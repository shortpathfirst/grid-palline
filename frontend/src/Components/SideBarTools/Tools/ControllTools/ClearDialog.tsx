import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from 'react-pro-sidebar';
import { GrClear } from "react-icons/gr";

const dialogBox = {
  question:"Clear Board?",
  description:"Are you sure? you will lose the work done.",
  positive:"Yes,i'm sure",
  negative:"No, go back",
}

function ClearDialog({ onClear }: { onClear: () => void }) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};
  const handleSuccessClose = () => {
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
          {dialogBox.question}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogBox.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{dialogBox.negative}</Button>
          <Button onClick={handleSuccessClose} autoFocus> {dialogBox.positive}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ClearDialog