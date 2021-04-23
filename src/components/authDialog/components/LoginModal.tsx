import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '../../../store/ducks/currentUser/actionCreators';
import {
  AuthorizeResultState,
  LoginPostData,
  AuthorizeState,
} from '../../../store/ducks/currentUser/contracts/state';
import { selectAuthorizeStatus } from '../../../store/ducks/currentUser/selectors';

export interface ModalProps {
  classes: any;
  openAuth: boolean;
  handleClose: () => void;
}

type Inputs = {
  login: string;
  password: string;
};

export const LoginModal: React.FC<ModalProps> = ({
  classes,
  openAuth,
  handleClose,
}: ModalProps): React.ReactElement => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const AuthStatus: AuthorizeState['status'] = useSelector(selectAuthorizeStatus);
  const onSubmit = (data: LoginPostData) => {
    if (!Object.keys(errors).length) {
      dispatch(SignUp(data));
    }
  };

  useEffect(() => {
    openAuth && AuthStatus === AuthorizeResultState.SUCCESS && handleClose();
  }, [AuthStatus]);

  return (
    <Dialog
      open={openAuth}
      onClose={handleClose}
      aria-labelledby="form-dialog"
      className={classes.rootPopupContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.AuthPopupContainer}>
        <DialogTitle id="form-dialog-title">Войти в Твиттер</DialogTitle>

        {AuthStatus === AuthorizeResultState.ERROR && (
          <Alert severity="error">Неверные данные</Alert>
        )}
        {AuthStatus === AuthorizeResultState.NOTCONFIRNMED && (
          <Alert severity="warning">
            Необходимо подтвердить ваш аккаунт! На ваш email отправлено письмо с подтверждением.
          </Alert>
        )}
        <DialogContent>
          <Controller
            name="login"
            control={control}
            defaultValue=""
            rules={{ required: 'Заполните поле логина' }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="emailAuth"
                label="Логин или Адрес электронной почты"
                type="text"
                fullWidth
                variant="filled"
                helperText={errors.login && errors.login.message}
                error={!!errors.login}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Заполните поле пароль' }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="passAuth"
                label="Пароль"
                variant="filled"
                type="password"
                fullWidth
                helperText={errors.password && errors.password.message}
                error={!!errors.password}
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions className={classes.formBottomActions}>
          <Button type="submit" variant="contained" color="primary">
            Войти
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
