import React, { useEffect, useRef, useState } from 'react';
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
    },
    FieldAboutMe: {
      '& textarea': {
        minHeight: '80px',
      },
      marginBottom: '15px',
    },
    Loader: {
      display: 'block',
      margin: '0 auto',
    },
  }),
);

interface ProfileEditProps {
  nextStep: () => void;
  edit: (val: any) => void;
}

export const Step2 = ({ nextStep, edit }: ProfileEditProps) => {
  const [aboutText, setAboutText] = useState('');
  const buttonRef = useRef(null);
  const classes = useStyles();

  const applyStep = (e: any) => {
    edit({ about: aboutText });
    nextStep();
  };
  return (
    <>
      <DialogContent className={classes.rootStep}>
        <DialogTitle id="form-dialog-title">Опишите себя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чем вы отличаетесь от других? Особо не раздумывайте, просто напишите что придет в
            голову.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            label="Расскажите о себе"
            variant="outlined"
            fullWidth
            className={classes.FieldAboutMe}
            multiline
            rowsMax={4}
            onChange={(e: any) => setAboutText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={applyStep} ref={buttonRef} variant="outlined" color="primary">
            далее
          </Button>
        </DialogActions>
      </DialogContent>
      )
    </>
  );
};
