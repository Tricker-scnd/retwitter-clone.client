import React, { useState, useEffect } from 'react';
import { Paper, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TweetFeed } from './components/TweetFeed';
import { ProfileEdit } from './components/ProfileEdit';
import { SpecialUserState } from '../../../store/ducks/users/contracts/state';
import { UserInfo } from './components/UserInfo';
import { ProfileHeader } from './components/ProfileHeader';
import { Tweet } from '../../../store/ducks/tweets/contracts/state';
import { selectSpecialUserTweets } from '../../../store/ducks/users/selectors';
import {
  GetSpecialUserTweets,
  SetSpecialUserTweets,
} from '../../../store/ducks/users/actionCreators';
import { UsersApi } from '../../../services/api/UsersApi';
import { selectCurrentUserSubscriptions } from '../../../store/ducks/currentUser/selectors';

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
    ProfileTopBlockUserAgout: {
      marginTop: '8px',
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
    },
    ProfileTopBlockUserSocialInfo: {
      paddingLeft: '4px',
      marginTop: '20px',
      display: 'flex',
      '& span': {
        cursor: 'pointer',
        marginRight: '15px',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    ProfileTabsContainer: {
      display: 'flex',
      width: '100%',
      marginTop: '25px',
    },
    ProfileTabs: {
      display: 'flex',
      width: '100%',

      '& button': {
        minWidth: 'unset',
        maxWidth: 'unset',
        flexBasis: '25%',
        [theme.breakpoints.down('sm')]: {
          minWidth: '100px',
          fontSize: '12px',
          flexGrow: '1',
          flexBasis: 'unset',
        },
      },
    },
    ProfileFeedContainer: {
      width: '100%',
      padding: '0px',
    },
    Loader: {
      display: 'block',
      margin: '0 auto',
    },
  }),
);

interface ProfileProps {
  userData?: SpecialUserState['user'];
  isOwner: Boolean;
}

export const Profile = ({ userData, isOwner }: ProfileProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabPage, setTabPage] = useState(0);
  const [profileEditOpened, setProfileEditOpened] = useState(false);

  const _subscribed = useSelector(selectCurrentUserSubscriptions)?.includes(userData!._id!);
  const [subscribed, setSubscribed] = useState(_subscribed);


  const handleChange = (event: any, newValue: number) => {
    setTabPage(newValue);
  };
  const handleOpenProfileEditor = () => {
    setProfileEditOpened(true);
  };
  const handleCloseProfileEditor = () => {
    setProfileEditOpened(false);
  };
  const subscribeAction = (id: string, type: boolean) => {
    if (type) {
      UsersApi.subscribeTo(id);
      setSubscribed(true);
    } else {
      UsersApi.unsubscribeTo(id);
      setSubscribed(false);
    }
  };

  const tweetsList: Tweet[] | null = useSelector(selectSpecialUserTweets);
  useEffect(() => {
    dispatch(GetSpecialUserTweets(userData?._id));
    return () => {
      dispatch(SetSpecialUserTweets(null));
    };
  }, []);

  return (
    <>
      <Paper className={classes.UserProfileRooot}>
        <ProfileHeader
          isOwner={isOwner}
          userData={userData}
          handleOpenProfileEditor={handleOpenProfileEditor}
          subscribeAction={subscribeAction}
          subscribed={subscribed}
        />

        <UserInfo userData={userData} />

        <div className={classes.ProfileTabsContainer}>
          <Tabs
            value={tabPage}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className={classes.ProfileTabs}>
            <Tab label="Твиты" />
            <Tab label="Твиты и ответы" />
            <Tab label="Медиа" />
            <Tab label="Нравится" />
          </Tabs>
        </div>
      </Paper>
      <Container className={classes.ProfileFeedContainer}>
        {tabPage === 0 && <TweetFeed uId={userData?._id} tweetsList={tweetsList} />}
        {tabPage === 1 && <span>PAGE TWEETS AND ANSWERS</span>}
        {tabPage === 2 && <span>PAGE OF MEDIA</span>}
        {tabPage === 3 && <span>PAGE OF LIKES</span>}
      </Container>

      <ProfileEdit opened={profileEditOpened} handleClose={handleCloseProfileEditor} />
    </>
  );
};
