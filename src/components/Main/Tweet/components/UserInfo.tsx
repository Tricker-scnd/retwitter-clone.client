import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { formatDateDistance } from '../../../../utils/formatDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetUserInfo: {
      display: 'flex',
      alignItems: 'center',
      '& a': {
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
        '& b': {
          marginRight: '8px',
          fontSize: '16px',
        },
        '&:hover b': {
          textDecoration: 'underline',
        },
      },
    },
    tweetUserInfoLogin: {
      fontWeight: 600,
      marginLeft: '5px',
      color: '#888',
      fontSize: '15px',
    },

    tweetPublished: {
      fontWeight: 400,
      fontSize: '12px',
      marginLeft: '6px',
      paddingLeft: '12px',
      position: 'relative',
      '&::before': {
        content: '"•"',
        position: 'absolute',
        left: '1px',
      },
    },
  }),
);

interface UserInfoProps {
  userInfo: {
    login: String;
    userName: String;
  };
  publishedDate: String;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userInfo, publishedDate }: UserInfoProps) => {
  const classes = useStyles();
  const userLinkClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div className={classes.tweetUserInfo}>
      <object>
        <Link to={`/${userInfo.login}`} onClick={userLinkClick}>
          <b>{userInfo.userName}</b>
          <CheckCircleSharpIcon color="primary" />
          <Typography className={classes.tweetUserInfoLogin}>@{userInfo.login}</Typography>
        </Link>
      </object>
      <span className={classes.tweetPublished}>
        {typeof publishedDate === 'string' && formatDateDistance(new Date(publishedDate))}
      </span>
    </div>
  );
};
