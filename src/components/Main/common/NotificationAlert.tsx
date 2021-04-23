import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

interface NotificationProps {
  notification: boolean;
  handleClose: () => void;
  message: string;
}

export const NotificationAlert = ({ notification, handleClose, message }: NotificationProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={notification}
      autoHideDuration={3500}
      onClose={handleClose}
      message={message}
      color="primary"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }></Snackbar>
  );
};
