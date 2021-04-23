import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MainTopBar } from '../../components/Main/common/MainTopBar';
import { UsersApi } from '../../services/api/UsersApi';
import { SpecialUser, SpecialUserLoadingState } from '../../store/ducks/users/contracts/state';
import { Profile } from '../../components/Main/Profile';
import { GetSpecialUser, SetStatusSpecialUser } from '../../store/ducks/users/actionCreators';
import { selectSpecialUserState } from '../../store/ducks/users/selectors';
import { selectCurrentUserInfo } from '../../store/ducks/currentUser/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Loader: {
      display: 'block',
      margin: '25px auto',
    },
  }),
);

interface UserParams {
  login: string;
}

export const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { login }: UserParams = useParams();

  useEffect(() => {
    dispatch(GetSpecialUser(login));
    return () => {
      dispatch(SetStatusSpecialUser(SpecialUserLoadingState.NEVER));
    };
  }, [login]);

  const currentUserData = useSelector(selectCurrentUserInfo);
  const { user: userData, status: profileLoader } = useSelector(selectSpecialUserState);

  return (
    <>
      {profileLoader !== SpecialUserLoadingState.LOADED ? (
        <CircularProgress className={classes.Loader} disableShrink />
      ) : (
        <>
          <MainTopBar text={userData ? userData.login : 'Профиль'} arrowBack={true} />
          <Profile userData={userData} isOwner={currentUserData?.login === login} />
        </>
      )}
    </>
  );
};
