import React from 'react';
import { Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface StepProps {
  classes: any;
  nextStep: () => void;
}

export const Step4 = ({ classes, nextStep }: StepProps) => {
  return (
    <>
      <DialogContent>
        <div className={classes.regStepTitleBlock}>
          <DialogTitle id="form-dialog-title-reg-step2" className={classes.regStepTitle}>
            Подтверждение аккаунта
          </DialogTitle>
        </div>

        <div className={classes.stepRegWrapper}>
          <Typography variant="h6" className={classes.SuccessRegMessage}>
            Ваш аккаунт был успешно создан
          </Typography>
          <Alert severity="warning">
            Необходимо подтвердить ваш аккаунт! На ваш email отправлено письмо с подтверждением.
          </Alert>
        </div>
      </DialogContent>
      <DialogActions className={classes.formBottomActions}>
        <Button onClick={nextStep} variant="contained" color="primary">
          ОК
        </Button>
      </DialogActions>
    </>
  );
};
