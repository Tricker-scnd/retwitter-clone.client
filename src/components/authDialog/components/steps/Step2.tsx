import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { Typography } from '@material-ui/core';

interface StepProps {
  classes: any;
  prevStep: any;
  nextStep: any;
  autoSubscription: boolean;
  changeAutoSubscription: any;
}

export const Step2 = ({
  classes,
  prevStep,
  nextStep,
  autoSubscription,
  changeAutoSubscription,
}: StepProps) => {
  return (
    <>
      <DialogContent>
        <div className={classes.regStepTitleBlock}>
          <Button onClick={prevStep} variant="contained" color="primary">
            Назад
          </Button>

          <DialogTitle id="form-dialog-title-reg-step2" className={classes.regStepTitle}>
            Настроить твиттер
          </DialogTitle>
        </div>

        <div className={classes.stepRegWrapper}>
          <FormControlLabel
            control={
              <Checkbox
                checked={autoSubscription}
                color="primary"
                onChange={changeAutoSubscription}
                name="checkedA"
              />
            }
            labelPlacement="start"
            label="Подписатся на популярных пользователей"
          />
          <Typography>
            Твиттер использует эти данные для подбора контента для вашей ленты. Ваши имя, адрес
            электронной почты и номер телефона никогда не будут храниться вместе с историей
            посещенных веб-сайтов.
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.formBottomActions}>
        <Button onClick={nextStep} variant="contained" color="primary">
          Далее
        </Button>
      </DialogActions>
    </>
  );
};
