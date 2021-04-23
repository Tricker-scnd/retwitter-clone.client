import React, { useEffect, useState } from 'react';
import { Typography, Paper, Avatar, IconButton, Grid } from '@material-ui/core';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  deleteTweet,
  fetchTweet,
  setLikeRequest,
  setTweet,
} from '../../store/ducks/tweet/actionCreators';
import { LoadingState, pinState } from '../../store/ducks/tweet/contracts/state';
import { selectTweetData, selectTweetLoadingState } from '../../store/ducks/tweet/selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import mediumZoom from 'medium-zoom';
import { MenuMore } from '../../components/Main/Tweet/components/MenuMore';
import { selectCurrentUserInfo } from '../../store/ducks/currentUser/selectors';
import { ActionsBlock } from '../../components/Main/Tweet/components/ActionsBlock';
import { Tweet } from '../../store/ducks/tweets/contracts/state';
import { likeTweet } from '../../services/api/TweetsApi';
import { likeTweetInList } from '../../store/ducks/tweets/actionCreators';
import { pinTweet } from '../../components/Main/TweetFeed';
import { NotificationAlert } from '../../components/Main/common/NotificationAlert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetItemRoot: {
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12);',
      borderRadius: '0px',
      transition: '0.1s all',
      boxShadow: 'none',
      textDecoration: 'none',

      '& a': {
        color: 'inherit',
      },
    },
    tweetLeftSide: {},
    tweetRightSide: {
      boxSizing: 'border-box',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '60px',
      height: '60px',
      margin: '0 auto',
    },
    tweetUserInfo: {
      display: 'flex',
      alignItems: 'center',
      '& b': {
        marginRight: '8px',
        fontSize: '16px',
      },
      '& a:hover': {
        textDecoration: 'underline',
      },
    },
    tweetUserInfoLogin: {
      fontWeight: 400,
      color: '#888',
      fontSize: '15px',
    },

    tweetContentBlock: {
      marginTop: '22px',
    },
    tweetContentBlockSimpleText: {
      lineHeight: '28px',
      color: '#333',
      fontWeight: 400,
      fontSize: '23px',
    },
    tweetActionsBlock: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '6px',
      paddingTop: '12px',
      maxWidth: '80%',
      margin: '0 auto',
    },
    tweetActionsBlockItem: {
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    tweetActionsBlockItemButton: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    tweetActionIcon: {
      fontSize: '20px',
    },
    tweetMoreActionsButton: {
      marginTop: '-6px',
      padding: '6px',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    TweetsLoader: {
      display: 'block',
      margin: '0 auto',
    },

    tweetBottomBlock: {
      color: 'rgb(91, 112, 131)',
    },
    tweetBottomBlockRow: {
      borderBottom: '1px solid rgb(235, 238, 240)',
      padding: '20px 0px',
    },
    tweetActivityStatRow: {
      '& span': {
        marginRight: '20px',
      },
      color: theme.palette.text.primary,
    },

    tweetImagesBlock: {
      maxHeight: '650px',
      marginTop: '20px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid rgba(0,0,0,0.04)',
      display: 'flex',
      justifyContent: 'space-between',
      transition: '0.15s all',
      cursor: 'pointer',
      '&:hover': {
        border: '2px solid rgba(0,0,0,0.1)',
      },
      flexWrap: 'wrap',
    },
    tweetImagesBlockItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '49%',
      minHeight: '104px',
      maxHeight: '320px',
      backgroundColor: 'rgb(253,253,253)',
      boxShadow: '0px 0px 3px rgba(0,0,0,0.07)',
      '&:hover': {
        filter: 'brightness(98%)',
      },
      '&:nth-child(3)': {
        marginTop: '5px',
      },
      '&:nth-child(4)': {
        marginTop: '5px',
      },
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
  }),
);

interface TweetProps {}

export const FullTweet: React.FC<TweetProps> = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params: { [0]: string; [1]: string } = useParams();
  const [deletedTweet, setDeletedTweet] = useState(false);

  const tweetData = useSelector(selectTweetData);
  const tweetLoader = useSelector(selectTweetLoadingState);
  const currentUser = useSelector(selectCurrentUserInfo);

  const [pinNotification, setPinNotification] = useState(false);
  const openPinNotification = () => {
    setPinNotification(true);
  };

  const shareLink = (e: any, link: string) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDeleteTweet = (id: string) => {
    dispatch(deleteTweet(id));
    setDeletedTweet(true);
  };

  useEffect(() => {
    dispatch(fetchTweet(params[1]));
    return () => {
      dispatch(setTweet(undefined));
    };
  }, [dispatch]);

  const likeHandler = (
    e: React.MouseEvent<HTMLElement>,
    pageFullTweet: boolean,
    fullTweetData: Tweet,
    idTweet?: string,
    tweetListKey?: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (fullTweetData) {
      if (pageFullTweet) {
        dispatch(setLikeRequest(fullTweetData._id, !fullTweetData.liked));
        likeTweet(fullTweetData._id);
      } else {
        dispatch(setLikeRequest(idTweet!, !fullTweetData.liked, true));
        dispatch(likeTweetInList(tweetListKey!, !fullTweetData.liked));
      }
    }
  };

  useEffect(() => {
    if (tweetLoader === LoadingState.LOADED) {
      mediumZoom('[data-zoomable]', {
        margin: 24,
        background: '#333',
        scrollOffset: 0,
      });
    }
  }, [tweetLoader]);

  return (
    <>
      {tweetLoader === LoadingState.LOADING ? (
        <CircularProgress className={classes.TweetsLoader} disableShrink />
      ) : (
        tweetLoader === LoadingState.LOADED &&
        !deletedTweet && (
          <Paper className={classes.tweetItemRoot}>
            <Grid container spacing={2}>
              <Grid item xs={2} className={classes.tweetLeftSide}>
                <Link to={`/${tweetData!.user.login}`}>
                  <Avatar
                    alt="User avatar"
                    src={tweetData?.user.avatarSrc}
                    className={classes.userAvatar}></Avatar>
                </Link>
              </Grid>
              <Grid item xs={9} className={classes.tweetRightSide}>
                <div className={classes.tweetUserInfo}>
                  <Link to={`/${tweetData!.user.login}`}>
                    <b>{tweetData!.user.userName}</b>
                  </Link>
                  <CheckCircleSharpIcon color="primary" />
                </div>
                <Typography className={classes.tweetUserInfoLogin}>
                  <Link to={`/${tweetData!.user.login}`}>@{tweetData!.user.login}</Link>
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <MenuMore
                  data-menuMore
                  ownTweet={currentUser?.login === tweetData?.user.login}
                  handleDeleteTweet={() => handleDeleteTweet(tweetData!._id)}
                  pinTweet={pinTweet}
                  pinnedInfo={{
                    pinned: currentUser?.pinnedTweet === tweetData!._id,
                    id: tweetData!._id,
                  }}
                  openPinNotification={openPinNotification}
                />
              </Grid>
            </Grid>

            <div className={classes.tweetContentBlock}>
              <Typography className={classes.tweetContentBlockSimpleText}>
                {tweetData && tweetData.text}
              </Typography>

              {tweetData!.images?.length ? (
                <div className={classes.tweetImagesBlock}>
                  {tweetData!.images.map((url, i) => (
                    <div className={classes.tweetImagesBlockItem} key={url + i}>
                      <img data-zoomable src={url} alt="image" />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className={classes.tweetBottomBlock}>
              <div className={classes.tweetBottomBlockRow}>
                <Typography>
                  {tweetData!.publishedDate && formatDate(new Date(tweetData!.publishedDate))}
                </Typography>
              </div>
              <div className={classes.tweetBottomBlockRow}>
                <Typography className={classes.tweetActivityStatRow}>
                  <span>
                    <b>1</b> ретвит
                  </span>
                  <span>
                    <b>{tweetData?.likesCount}</b> отметок «Нравится»
                  </span>
                </Typography>
              </div>
            </div>

            {tweetData && (
              <ActionsBlock
                fullTweet
                fullTweetData={tweetData}
                likeHandler={likeHandler}
                shareHandler={shareLink}
              />
            )}

            <NotificationAlert
              notification={pinNotification}
              handleClose={() => {
                setPinNotification(false);
              }}
              message={'Твит закреплен'}
            />
          </Paper>
        )
      )}
    </>
  );
};
