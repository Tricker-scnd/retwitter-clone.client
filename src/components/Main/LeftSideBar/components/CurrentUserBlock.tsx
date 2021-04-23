import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CurrentUser } from '../../../../store/ducks/currentUser/contracts/state';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { LogOutRequest } from '../../../../store/ducks/currentUser/actionCreators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CurrentUserSideBlock: {
      width: '96%',
      marginTop: '30px',
      border: 'none',
      boxShadow: 'unset',
      padding: '8px 12px',
      borderRadius: '22px',
      cursor: 'pointer',
      transition: '0.2s all',
      '&:hover': {
        backgroundColor: ' rgba(106, 167, 156, 0.5)',
      },
      display: 'flex',
      alignItems: 'center',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '30px',
      height: '30px',
    },
    userNameLoginBlock: {
      marginLeft: '14px',
      display: 'flex',
      flexDirection: 'column',
      '& b': {
        fontSize: '16px',
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
      },
      '& span': {
        fontSize: '14px !important',
        opacity: '0.8',
        [theme.breakpoints.down('md')]: {
          fontSize: '13px !important',
        },
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    userBlockMoreIcon: {
      marginLeft: 'auto',
      marginTop: '4px',
    },
  }),
);

interface CurrentUserBlockProps {
  userInfo: CurrentUser;
}
export const CurrentUserBlock = ({ userInfo }: CurrentUserBlockProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: any) => {
    event?.stopPropagation();
    event?.preventDefault();
    setAnchorEl(null);
  };
  const LogOutHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(LogOutRequest());
    handleClose();
  };

  return (
    <Paper className={classes.CurrentUserSideBlock}>
      <Avatar alt="User avatar" src={userInfo?.avatarSrc} className={classes.userAvatar} />
      <div className={classes.userNameLoginBlock}>
        <b>{userInfo?.fullname}</b>
        <span>@{userInfo?.login}</span>
      </div>
      <MoreHorizRoundedIcon className={classes.userBlockMoreIcon} onClick={handleClick} />

      <Menu
        id="simple-menu-user"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={LogOutHandler}>Выйти</MenuItem>
      </Menu>
    </Paper>
  );
};
