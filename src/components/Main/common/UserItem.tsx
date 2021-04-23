import React from 'react';
import { Paper, Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { SubState } from '../../../store/ducks/currentUser/contracts/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ItemRoot: {
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12);',
      borderRadius: '0px',
      transition: '0.1s all',
      boxShadow: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: 'rgb(112 ,150 ,137 , 0.06)',
      },
    },
    userLeftSide: {
      alignItems: 'center',
    },
    userRightSide: {
      display: 'flex',
      boxSizing: 'border-box',
      alignItems: 'center',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '50px',
      height: '50px',
      margin: '0 auto',
    },
    UserInfoLogin: {
      fontWeight: 600,
      color: '#888',
      fontSize: '15px',
    },

    UserInfo: {
      display: 'flex',
      flexDirection: 'column',
      color: 'inherit',
      '& b': {
        fontSize: '17px',
      },
      '&:hover b': {
        textDecoration: 'underline',
      },
    },
  }),
);

interface TweetProps {
  userInfo: SubState;
}

export const UserItem: React.FC<TweetProps> = ({ userInfo }: TweetProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Paper className={classes.ItemRoot}>
      <Grid container spacing={2}>
        <Grid item xs={2} className={classes.userLeftSide}>
          <Link to={`/${userInfo.login}`}>
            <Avatar
              alt="User avatar"
              src={userInfo.avatarSrc}
              className={classes.userAvatar}></Avatar>
          </Link>
        </Grid>
        <Grid item xs={9} className={classes.userRightSide}>
          <div className={classes.UserInfo}>
            <b>{userInfo.fullname}</b>
            <Typography className={classes.UserInfoLogin}>@{userInfo.login}</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
