import React, { useRef, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, DialogContentText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { useForm, Controller } from 'react-hook-form';
import { BusyValuesResult, RegistrationPostData } from '../../../../store/ducks/currentUser/contracts/state';
import { AuthApi } from '../../../../services/api/AuthApi';
import { Alert } from '@material-ui/lab';

interface StepProps {
  classes: any;
  prevStep: any;
  nextStep: any;
  changeRegData: any;
  setPassRegistration: any;
  regData?: RegistrationPostData;
}
interface Inputs {
  login: string;
  password: string;
  passwordConfirm: string;
}

export const Step3 = ({ classes, prevStep, nextStep,setPassRegistration, changeRegData, regData,}: StepProps) => {
  
  const {handleSubmit,control,formState: { errors },watch,} = useForm<Inputs>();

  const password = useRef({});
  password.current = watch('password', '');

  const [statusStep, setStatusStep] = useState({
    status: 'success',
    message: '',
  });

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length === 0) {
      changeRegData({ ...data });

      const chekForBusy: BusyValuesResult = await AuthApi.registerCheckForBusy({
        login: data.login
      });
      if (chekForBusy.status === 'success') {
        setPassRegistration(true);
        nextStep();
      } else {
        setStatusStep({ status: chekForBusy.status, message: chekForBusy.message });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className={classes.regStepTitleBlock}>
            <Button onClick={prevStep} variant="contained" color="primary">
              Назад
            </Button>
            <DialogTitle id="form-dialog-title-reg-step3" className={classes.regStepTitle}>
              Завершение регистрации
            </DialogTitle>
          </div>
          
          {statusStep.status !== 'success' && <Alert severity="error">{statusStep.message}</Alert>}

          <Controller
            name="login"
            control={control}
            defaultValue={regData?.login}
            rules={{
              required: 'Заполните поле логина',
              minLength: { value: 3, message: 'Минимальная длина логина 3 символа' },
              maxLength: { value: 30, message: 'Максимальная длина логина 30 символов' },
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="loginReg"
                label="Ваш логин"
                type="text"
                helperText={errors.login && errors.login.message}
                error={!!errors.login}
                {...field}
                fullWidth
              />
            )}
          />
          <DialogContentText>
            Логин будет использоватся в качестве никнейма. По нему пользователи смогут вас найти.
          </DialogContentText>
          <br />

          <Controller
            name="password"
            control={control}
            defaultValue={regData?.login}
            rules={{
              required: 'Заполните обязательное поле',
              minLength: { value: 6, message: 'Минимальная длина пароля 6 символов' },
            }}
            render={({ field }) => (
              <TextField
                margin="dense"
                id="passordReg1"
                label="Введите пароль"
                type="password"
                helperText={errors.password && errors.password.message}
                error={!!errors.password}
                {...field}
                fullWidth
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            defaultValue={regData?.login}
            rules={{
              required: 'Заполните обязательное поле',
              minLength: { value: 6, message: 'Минимальная длина пароля 6 символов' },
              validate: (value) => value === password.current || 'Пароли не совпадают',
            }}
            render={({ field }) => (
              <TextField
                margin="dense"
                id="passordReg2"
                label="Повторите пароль"
                type="password"
                helperText={errors.passwordConfirm && errors.passwordConfirm.message}
                error={!!errors.passwordConfirm}
                {...field}
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions className={classes.formBottomActions}>
          <Button variant="contained" type="submit" color="primary">
            Зарегистрироваться
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
