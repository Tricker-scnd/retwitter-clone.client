import React from 'react';
import { Typography, Paper, Avatar, IconButton, Grid } from '@material-ui/core';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { MenuMore } from './components/MenuMore';
import { Tweet } from '../../../store/ducks/tweets/contracts/state';
import { ActionsBlock } from './components/ActionsBlock';
import { pinState } from '../../../store/ducks/tweet/contracts/state';

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
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: 'rgb(112 ,150 ,137 , 0.06)',
      },
    },
    tweetLeftSide: {},
    tweetRightSide: {
      boxSizing: 'border-box',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '50px',
      height: '50px',
      margin: '0 auto',
    },
    tweetContentBlock: {
      marginTop: '9px',
    },
    tweetContentBlockSimpleText: {
      lineHeight: '19px',
      color: '#333',
      fontWeight: 500,
      fontSize: '15px',
      whiteSpace: 'pre-wrap',
    },
    tweetActionsBlock: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '6px',
      marginTop: '12px',
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

    tweetImagesBlock: {
      maxHeight: '620px',
      marginTop: '20px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid rgba(0,0,0,0.04)',
      display: 'flex',
      justifyContent: 'space-between',
      transition: '0.15s all',
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
      maxHeight: '300px',
      minHeight: '104px',
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
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      },
    },
  }),
);

interface TweetProps {
  TweetInfo: Tweet;
  handleTweetClick?: any;
  ownTweet: boolean;
  handleDeleteTweet: Function;
  listKey: number;
  noActions?: boolean;
  pinnedTweet?: String;
  openPinNotification: () => void;
  shareLink: (e: any, link: string) => void;
  pinTweet: (e: any, id: string, t: pinState) => void;
  likeHandler: (
    e: React.MouseEvent<HTMLElement>,
    pageFullTweet: boolean,
    fullTweetData: Tweet,
    idTweet?: string,
    tweetListKey?: number,
  ) => void;
}

export const TweetItem: React.FC<TweetProps> = ({
  TweetInfo,
  handleTweetClick,
  ownTweet,
  handleDeleteTweet,
  listKey,
  likeHandler,
  shareLink,
  noActions,
  pinTweet,
  pinnedTweet,
  openPinNotification,
}: TweetProps): React.ReactElement => {
  const classes = useStyles();
  const openGallery = (e: any) => {
    // e.preventDefault();
    // e.stopPropagation();
  };

  return (
    <Paper className={classes.tweetItemRoot} onClick={handleTweetClick}>
      <Grid container spacing={2}>
        <Grid item xs={2} className={classes.tweetLeftSide}>
          <Link to={`/${TweetInfo.user.login}`}>
            <Avatar
              alt="User avatar"
              src={TweetInfo.user.avatarSrc}
              className={classes.userAvatar}></Avatar>
          </Link>
        </Grid>

        <Grid item xs={9} className={classes.tweetRightSide}>
          <UserInfo userInfo={TweetInfo.user} publishedDate={TweetInfo.publishedDate!} />

          <div className={classes.tweetContentBlock}>
            <Typography className={classes.tweetContentBlockSimpleText}>
              {TweetInfo.text}
            </Typography>

            {TweetInfo.images?.length ? (
              <div className={classes.tweetImagesBlock} onClick={openGallery}>
                {TweetInfo.images.map((url, i) => (
                  <div className={classes.tweetImagesBlockItem} key={url + i}>
                    <img data-zoomable src={url} alt="image" />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          {!noActions && (
            <ActionsBlock
              fullTweetData={TweetInfo}
              tweetListKey={listKey}
              likeHandler={likeHandler}
              shareHandler={shareLink}
            />
          )}
        </Grid>
        <Grid item xs={1}>
          <MenuMore
            data-menuMore
            ownTweet={ownTweet}
            pinTweet={pinTweet}
            pinnedInfo={{ pinned: pinnedTweet === TweetInfo._id, id: TweetInfo._id }}
            handleDeleteTweet={() => handleDeleteTweet(TweetInfo._id)}
            openPinNotification={openPinNotification}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
