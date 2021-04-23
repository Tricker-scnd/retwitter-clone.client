import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { SpecialUserState } from '../../../../../store/ducks/users/contracts/state';
import { formatRegisterDate } from '../../../../../utils/formatDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    UserProfileRooot: {
      boxShadow: 'none',
      borderRadius: '0px',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12)',
    },
    UserTopBackground: {
      backgroundColor: 'rgb(196, 207, 214)',
      height: '160px',
    },

    ProfileTopBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 18px',
    },
    ProfileTopBlockLeftSide: {
      marginTop: '-65px',
    },
    ProfileTopBlockRightSide: {
      paddingTop: '18px',
      '& button': {
        textTransform: 'unset',
        fontWeight: 700,
        fontSize: '16px',
      },
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '140px',
      height: '140px',
      border: '4px solid #fff',
      boxSizing: 'border-box',
    },
    ProfileTopBlockUserInfoBlock: {
      padding: '0px 18px',
    },
    ProfileTopBlockUserFullname: {
      fontSize: '20px',
      fontWeight: 800,
      paddingLeft: '4px',
    },
    ProfileTopBlockUserLogin: {
      marginTop: '-6px',
      paddingLeft: '4px',
      opacity: '0.8',
    },
    ProfileTopBlockUserAbout: {
      marginTop: '8px',
      marginBottom: '14px',
      paddingLeft: '4px',
    },
    ProfileTopBlockUserRegDate: {
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: '20px',
        opacity: '0.8',
      },
      '& span': {
        fontSize: '14px',
        paddingLeft: '6px',
      },
    },
    ProfileTopBlockUserSocialInfo: {
      paddingLeft: '4px',
      marginTop: '10px',
      display: 'flex',
      '& span': {
        cursor: 'pointer',
        marginRight: '15px',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  }),
);

interface ProfileProps {
  userData?: SpecialUserState['user'];
}

export const UserInfo = ({ userData }: ProfileProps) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.ProfileTopBlockUserInfoBlock}>
        <Typography className={classes.ProfileTopBlockUserFullname}>
          {userData?.fullname}
        </Typography>
        <Typography className={classes.ProfileTopBlockUserLogin}>@{userData?.login}</Typography>
        <Typography className={classes.ProfileTopBlockUserAbout}>{userData?.about}</Typography>
        <Typography className={classes.ProfileTopBlockUserRegDate}>
          <DateRangeIcon />
          Регистрация:
          <span>
            {userData?.registerDate && formatRegisterDate(new Date(userData.registerDate))}
          </span>
        </Typography>
        <Typography className={classes.ProfileTopBlockUserSocialInfo}>
          <span>
            <b>{userData?.subscriptions?.length}</b> в читаемых
          </span>
          <span>
            <b>{userData?.subCount}</b> читатель
          </span>
        </Typography>
      </div>
    </>
  );
};
