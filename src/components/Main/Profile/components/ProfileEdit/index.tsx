import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';
import { useDispatch } from 'react-redux';
import { EditProfile } from '../../../../../store/ducks/currentUser/actionCreators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootPopup: {
      minWidth: '400px',
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
    Loader: {
      display: 'block',
      margin: '0 auto',
    },
  }),
);

interface ProfileEditProps {
  opened: boolean;
  handleClose: () => void;
}

interface editorSteps {
  avatar?: Object;
  about?: string;
}

export const ProfileEdit = ({ opened, handleClose }: ProfileEditProps) => {
  const [editData, setEditData] = useState<editorSteps>({});
  const [step, setStep] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();

  const nextStep = () => {
    setStep((prev) => ++prev);
  };

  const edit = (val: any) => {
    setEditData((prev) => ({ ...prev, ...val }));
  };

  const applyEdit = () => {
    dispatch(EditProfile(editData));
    handleClose();
    setTimeout(() => {
      setStep(1);
    }, 300);
  };
  const cancel = () => {
    setEditData({});
    handleClose();
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  return (
    <>
      <Dialog
        open={opened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.rootPopup}
        fullWidth={true}
        maxWidth={'sm'}>
        {step === 1 && <Step1 nextStep={nextStep} edit={edit} />}
        {step === 2 && <Step2 nextStep={nextStep} edit={edit} />}
        {step === 3 && <Step3 applyEdit={applyEdit} cancel={cancel} />}
      </Dialog>
    </>
  );
};
