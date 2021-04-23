import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { RegistrationPostData } from '../../../store/ducks/currentUser/contracts/state';
import { AuthApi } from '../../../services/api/AuthApi';

export interface ModalProps {
  classes: any;
  openReg: boolean;
  handleClose: () => void;
}

const baseRegData = {
  email: '',
  fullname: '',
  login: '',
  password: '',
  passwordConfirm: '',
  birthDate: '',
  phone: '',
};

export const RegisterModal: React.FC<ModalProps> = ({
  classes,
  openReg,
  handleClose,
}): React.ReactElement => {
  const [autoSubscription, setAutoSubscription] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [regData, setRegData] = useState<RegistrationPostData>(baseRegData);
  const [passRegistration, setPassRegistration] = useState(false);

  const changeRegData = (newData: object) => {
    setRegData((prev) => ({ ...prev, ...newData }));
  };
  
  const changeAutoSubscription = () => {
    setAutoSubscription((prev) => !prev);
  };

  const nextStep = () => {
    if (currentStep !== 4) {
      setCurrentStep((prev) => ++prev);
    } else {
      handleClose();
      setCurrentStep(1);
      setPassRegistration(false);
      setRegData(baseRegData);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => --prev);
  };

  const finishRegistration = () => {
    AuthApi.register(regData);
  };

  useEffect(() => {
    if (passRegistration) finishRegistration();
  }, [passRegistration]);

  return (
    <>
      <Dialog open={openReg} onClose={handleClose} aria-labelledby="form-dialog-title">
        {currentStep === 1 && (
          <Step1
            classes={classes}
            nextStep={nextStep}
            changeRegData={changeRegData}
            regData={regData}
          />
        )}
        {currentStep === 2 && (
          <Step2
            classes={classes}
            prevStep={prevStep}
            nextStep={nextStep}
            autoSubscription={autoSubscription}
            changeAutoSubscription={changeAutoSubscription}
          />
        )}
        {currentStep === 3 && (
          <Step3
            classes={classes}
            prevStep={prevStep}
            nextStep={nextStep}
            regData={regData}
            changeRegData={changeRegData}
            setPassRegistration={setPassRegistration}
          />
        )}
        {currentStep === 4 && <Step4 classes={classes} nextStep={nextStep} />}
      </Dialog>
    </>
  );
};
