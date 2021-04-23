import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SpecialUserState } from '../../../../../store/ducks/users/contracts/state';

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
    Loader: {
      display: 'block',
      margin: '0 auto',
    },
  }),
);

interface ProfileHeaderProps {
  userData?: SpecialUserState['user'];
  isOwner: Boolean;
  handleOpenProfileEditor: () => void;
  subscribeAction: (id: string, type: boolean) => void;
  subscribed?: boolean;
}

export const ProfileHeader = ({
  userData,
  isOwner,
  handleOpenProfileEditor,
  subscribeAction,
  subscribed,
}: ProfileHeaderProps) => {
  const classes = useStyles();
  const subButton = useRef<HTMLButtonElement>(null);

  const [subscribeText, setSubscribeText] = useState<string>(subscribed ? 'В читаемых' : 'Читать');

  useEffect(() => {
    setSubscribeText(subscribed ? 'В читаемых' : 'Читать');
  }, [subscribed]);
  return (
    <>
      <div className={classes.UserTopBackground}></div>
      <div className={classes.ProfileTopBlock}>
        <div className={classes.ProfileTopBlockLeftSide}>
          <Avatar
            alt="User avatar"
            src={userData?.avatarSrc}
            className={classes.userAvatar}></Avatar>
        </div>
        <div className={classes.ProfileTopBlockRightSide}>
          {isOwner ? (
            <Button variant="outlined" color="primary" onClick={handleOpenProfileEditor}>
              Настроить профиль
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              ref={subButton}
              onMouseEnter={() => {
                subscribed && setSubscribeText('Перестать читать');
              }}
              onMouseLeave={() => {
                subscribed && setSubscribeText('В читаемых');
              }}
              onClick={() => subscribeAction(userData!._id!, !subscribed)}>
              {subscribeText}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
