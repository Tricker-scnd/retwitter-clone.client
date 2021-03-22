import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Modal as AuthPopups } from '../components/authDialog';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  leftSide: {
    backgroundColor: 'rgb(57, 105, 105)',
    flex: '0 0 45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  leftSideBG: {
    transform: 'rotate(180deg) translateX(15%) translateY(-2%)',
    color: 'rgb(50, 84, 84)',
    zIndex: 0,
    width: '200%',
    height: '200%',
    position: 'absolute',
  },
  leftSideList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '380px',
    zIndex: 5,
    paddingTop: '60px',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingLeft: '4px',
    },
    '& svg': {
      color: '#fff',
      marginRight: '20px',
      fontSize: '30px',
    },
    '& h6': {
      color: '#fff',
      fontWeight: 600,
      fontSize: 20,
    },
  },
  authSide: {
    flex: '0 0 55%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    '& button': {
      width: '100%',
      padding: '6px 0',
      marginTop: '10px',
    },

    '& .auth-wrapper': {
      width: '400px',
    },
  },
  authTitleText: {
    fontSize: '30px',
    marginBottom: '50px',
    fontWeight: 700,
  },
  authTitleLabel: {
    fontSize: 14,
    fontWeight: 700,
  },
  authPopup1: {
    padding: '50px',
  },
  formBottomActions: {
    marginTop: '20px',
    padding: '20px',
  },
  aboveInputLabel: {
    margin: '40px 0 0 0',
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgb(39, 66, 66)',
    '& b': {
      display: 'block',
    },
  },
  mainLogoIcon: {
    fontSize: 80,
    margin: '0 auto',
    marginBottom: '20px',
    display: 'block',
  },

  birthDayBlock: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControlBirthDay: {
    flex: '0 0 33%',
  },
}));

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  const [openReg, setOpenReg] = React.useState(false);
  const [openAuth, setOpenAuth] = React.useState(false);

  const handleClickOpen = (type: String): void => {
    switch (type) {
      case 'reg':
        setOpenReg(true);
        break;
      case 'auth':
        setOpenAuth(true);
        break;
      default:
        break;
    }
  };

  const handleClose = (): void => {
    setOpenReg(false);
    setOpenAuth(false);
  };

  return (
    <div className={classes.wrapper}>
      <section className={classes.leftSide}>
        <ChatBubbleIcon className={classes.leftSideBG} />
        <ul className={classes.leftSideList}>
          <li>
            <SearchIcon />
            <Typography variant="h6">Читайте интересные вам темы.</Typography>
          </li>
          <li>
            <PeopleIcon />
            <Typography variant="h6">Узнайте, о чем говорят в мире.</Typography>
          </li>
          <li>
            <ForumIcon />
            <Typography variant="h6">Присоеденяйтесь к общению.</Typography>
          </li>
        </ul>
      </section>
      <section className={classes.authSide}>
        <div className="auth-wrapper">
          <MessageIcon className={classes.mainLogoIcon} color="primary" />
          <Typography variant="h3" className={classes.authTitleText}>
            Узнайте, что происходит в мире прямо сейчас!
          </Typography>
          <Typography className={classes.authTitleLabel}>Присоеденяйтесь прямо сейчас!</Typography>
          <Button variant="contained" color="primary" onClick={() => handleClickOpen('reg')}>
            Зарегистрироватся
          </Button>
          <Button variant="outlined" color="primary" onClick={() => handleClickOpen('auth')}>
            Войти
          </Button>
        </div>
      </section>

      <AuthPopups
        classes={classes}
        openAuth={openAuth}
        openReg={openReg}
        handleClose={handleClose}
      />
    </div>
  );
};
