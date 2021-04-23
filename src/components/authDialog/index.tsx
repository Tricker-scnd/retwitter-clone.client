import React from 'react';

import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';

export interface ModalProps {
  classes: any;
  openAuth: boolean;
  openReg: boolean;
  handleClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  classes,
  openAuth,
  openReg,
  handleClose,
}): React.ReactElement => {
  return (
    <>
      <LoginModal openAuth={openAuth} classes={classes} handleClose={handleClose} />
      <RegisterModal openReg={openReg} handleClose={handleClose} classes={classes} />
    </>
  );
};
