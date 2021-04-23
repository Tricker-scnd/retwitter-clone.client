import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Avatar,
  IconButton,
  Grid,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStep: {
      minWidth: '400px',
      minHeight: '350px',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '15px',
    },
    stepWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
      '& h4': {
        fontSize: '26px',
        textAlign: 'center',
      },
    },
    stepActions: {},
    Loader: {
      display: 'block',
      margin: '0 auto',
    },
  }),
);

interface ProfileEditProps {
  cancel: () => void;
  applyEdit: () => void;
}

export const Step3 = ({ cancel, applyEdit }: ProfileEditProps) => {
  const classes = useStyles();

  return (
    <>
      <DialogContent className={classes.rootStep}>
        <DialogTitle id="form-dialog-title">Подтверждение</DialogTitle>
        <div className={classes.stepWrapper}>
          <DialogContent>
            <h4>Ваш профиль обновлен.</h4>
          </DialogContent>

          <DialogActions className={classes.stepActions}>
            <Button onClick={cancel} variant="outlined" color="primary">
              Отмена
            </Button>
            <Button onClick={applyEdit} variant="contained" color="primary">
              Применить
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </>
  );
};
