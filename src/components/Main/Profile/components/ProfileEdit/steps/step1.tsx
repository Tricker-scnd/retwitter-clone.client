import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootPopup: {
      minWidth: '400px',
    },
    rootStep: {
      minWidth: '400px',
      minHeight: '350px',
    },
    inputAvatarWrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '140px',
      height: '140px',
      margin: '0 auto',
    },
    inputAvatarWrapperLoaded: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70px',
      height: '70px',
      '& > svg': {
        width: '15px',
        height: '15px',
      },
    },
    inputAvatar: {
      position: 'absolute',
      opacity: '0',
      width: '140px',
      height: '140px',
      backgroundColor: '#111',
      borderRadius: '100%',
      zIndex: 1002,
      cursor: 'pointer',
    },
    plusIcon: {
      position: 'absolute',
      right: '5px',
      height: '30px',
      width: '30px',
      zIndex: 1001,
      color: 'white',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '140px',
      height: '140px',
      border: '4px solid #fff',
      boxSizing: 'border-box',
      zIndex: 1000,
      '&:hover': {
        opacity: '1',
      },
    },
    userAvatarLoaded: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '70px',
      height: '70px',
      border: '4px solid #fff',
      boxSizing: 'border-box',
      zIndex: 1000,
      '&:hover': {
        opacity: '1',
      },
    },
    LoadedAvatar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',

      '& img': {
        maxHeight: '300px',
        boxShadow: ' 0 0 10px rgba(0,0,0,0.1)',
      },
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

export const Step1 = ({ nextStep, edit }: ProfileEditProps) => {
  const buttonRef = useRef(null);
  const classes = useStyles();
  const [avatarBlob, setAvatarBlob] = useState<Blob>();

  const inputImage = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      edit({ avatar: file });
      const fileObj = new Blob([file]);
      setAvatarBlob(fileObj);
    }
  };

  return (
    <>
      <DialogContent className={classes.rootStep}>
        <DialogTitle id="form-dialog-title">Выберите изображение профиля</DialogTitle>
        <DialogContent>
          <DialogContentText>Загрузите свое лучшее селфи.</DialogContentText>
        </DialogContent>
        <DialogContent>
          <div
            className={avatarBlob ? classes.inputAvatarWrapperLoaded : classes.inputAvatarWrapper}>
            <input type="file" className={classes.inputAvatar} onChange={inputImage} />
            <Avatar
              alt="User avatar"
              className={avatarBlob ? classes.userAvatarLoaded : classes.userAvatar}></Avatar>
            <PhotoCameraIcon className={classes.plusIcon} />
          </div>
          {avatarBlob && (
            <div className={classes.LoadedAvatar}>
              <img src={URL.createObjectURL(avatarBlob)} alt="avatar" />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={nextStep} ref={buttonRef} variant="outlined" color="primary">
            Далее
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};
