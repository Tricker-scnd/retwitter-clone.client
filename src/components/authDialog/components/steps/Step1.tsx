import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaskedInput from 'react-text-mask';
import { BirthDatePicker } from '../birthDatePicker';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import {
  BusyValuesResult,
  RegistrationPostData,
} from '../../../../store/ducks/currentUser/contracts/state';
import { useForm, Controller } from 'react-hook-form';
import { AuthApi } from '../../../../services/api/AuthApi';
import { Alert } from '@material-ui/lab';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}
function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '+',
        '3',
        '8',
        '(',
        /[0-9]/,
        /\d/,
        /\d/,
        ')',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

interface StepProps {
  classes: any;
  nextStep: any;
  handleChangeRegInputs?: any;
  changeRegData: any;
  regData?: RegistrationPostData;
}

interface Inputs {
  fullname: string;
  phone: string;
  email: string;
  birthDate?: string;
}

export const Step1 = ({ classes, nextStep, changeRegData, regData }: StepProps) => {
  const [birthDate, setbirthDate] = useState('');
  const [statusStep, setStatusStep] = useState({
    status: 'success',
    message: '',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length === 0) {
      changeRegData({ ...data, birthDate });

      const chekForBusy: BusyValuesResult = await AuthApi.registerCheckForBusy({
        email: data.email,
        phone: data.phone,
      });
      if (chekForBusy.status === 'success') {
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
          <DialogTitle id="form-dialog-title-reg-step1" className={classes.regStepTitle}>
            Создайте учетную запись
          </DialogTitle>

          {statusStep.status !== 'success' && <Alert severity="error">{statusStep.message}</Alert>}

          <Controller
            name="fullname"
            control={control}
            defaultValue={regData?.fullname}
            rules={{
              required: 'Заполните поле',
              minLength: { value: 3, message: 'Минимальная длина 3 символа' },
              maxLength: { value: 60, message: 'Максимальная длина логина 60 символов' },
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="fullnameReg"
                label="Ваше имя"
                type="text"
                fullWidth
                helperText={errors.fullname && errors.fullname.message}
                error={!!errors.fullname}
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue={regData?.phone}
            rules={{
              required: 'Введите номер телефона',
              validate: (value) => value.indexOf(' ') === -1 || 'Не корректно введенный номер',
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="phoneReg"
                label="Номер телефона"
                type="text"
                fullWidth
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                }}
                helperText={errors.phone && errors.phone.message}
                error={!!errors.phone}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={regData?.email}
            rules={{
              required: 'Заполните поле email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="emailReg"
                label="Адрес электронной почты"
                type="email"
                fullWidth
                helperText={errors.email && errors.email.message}
                error={!!errors.email}
                {...field}
              />
            )}
          />
          <DialogContentText className={classes.aboveInputLabel}>
            <b>Дата рождения</b>
            Эта информация не будет общедоступной. Подтвердите свой возраст, даже если эта учетная
            запись предназначена для компании, домашнего животного и т. д.
          </DialogContentText>
          <BirthDatePicker setbirthDate={setbirthDate} selectedDate={regData?.birthDate} />
        </DialogContent>

        <DialogActions className={classes.formBottomActions}>
          <Button type="submit" variant="contained" color="primary">
            Далее
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
