import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaskedInput from 'react-text-mask';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
        ' ',
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

interface State {
  phoneMask: string;
  emailMask: string;
}

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
  const [values, setValues] = useState<State>({
    phoneMask: '+38(  )',
    emailMask: '1320',
  });
  const [birthDate, setbirthDate] = React.useState<{
    day: number;
    month: string | number;
    year: number;
  }>({
    day: 0,
    month: 0,
    year: 0,
  });
  const handleChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDateSelect = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof birthDate;
    
    setbirthDate({
      ...birthDate,
      [name]: event.target.value,
    });
  };

  const days = [],
    years = [];
  const currentYear = new Date().getFullYear();

  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  for (let i = 1920; i < currentYear; i++) {
    years.push(i);
  }

  return (
    <>
      <Dialog open={openAuth} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Войти в Твиттер</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="emailAuth"
            label="Адрес электронной почты"
            type="text"
            fullWidth
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="passAuth"
            label="Пароль"
            variant="filled"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions className={classes.formBottomActions}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Войти
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReg} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создайте учетную запись</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="nameReg" label="Ваше имя" type="text" fullWidth />
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
            name="phoneMask"
            value={values.phoneMask}
            onChange={handleChangeInputs}
          />
          <TextField
            autoFocus
            margin="dense"
            id="emailReg"
            label="Адрес электронной почты"
            type="email"
            fullWidth
          />
          <DialogContentText className={classes.aboveInputLabel}>
            <b>Дата рождения</b>
            Эта информация не будет общедоступной. Подтвердите свой возраст, даже если эта учетная
            запись предназначена для компании, домашнего животного и т. д.
          </DialogContentText>

          <div className={classes.birthDayBlock}>
            <FormControl variant="outlined" className={classes.formControlBirthDay}>
              <InputLabel htmlFor="outlined-age-native-simple">День</InputLabel>
              <Select
                native
                value={birthDate.day}
                onChange={handleChangeDateSelect}
                label="День"
                inputProps={{
                  name: 'day',
                  id: 'outlined-day-native-simple',
                }}>
                    <option aria-label="None" value="" />
                {days.map((i) => (
                  <option value={i} key={'d' + i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControlBirthDay}>
              <InputLabel htmlFor="outlined-age-native-simple">Месяц</InputLabel>
              <Select
                native
                value={birthDate.month}
                onChange={handleChangeDateSelect}
                label="Месяц"
                inputProps={{
                  name: 'month',
                  id: 'outlined-month-native-simple',
                }}>
                    <option aria-label="None" value="" />
                {month.map((i) => (
                  <option value={i} key={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControlBirthDay}>
              <InputLabel htmlFor="outlined-age-native-simple">Год</InputLabel>
              <Select
                native
                value={birthDate.year}
                onChange={handleChangeDateSelect}
                label="Год"
                inputProps={{
                  name: 'year',
                  id: 'outlined-year-native-simple',
                }}>
                    <option aria-label="None" value="" />
                {years.map((i) => (
                  <option value={i} key={'y' + i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>

        <DialogActions className={classes.formBottomActions}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Далее
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
