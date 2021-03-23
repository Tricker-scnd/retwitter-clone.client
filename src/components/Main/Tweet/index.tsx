import React from 'react';
import { Typography, Paper, Avatar, IconButton, Grid } from '@material-ui/core';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
      '&:hover': {
        backgroundColor: 'rgb(245,248,250)',
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
    },
    tweetUserInfoLogin: {
      fontWeight: 600,
      marginLeft: '5px',
      color: '#888',
      fontSize: '15px',
    },
    tweetContentBlock: {
      marginTop: '6px',
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
    tweetMoreActionsButton: {
      marginTop: '-6px',
      padding: '6px',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  }),
);

interface TweetProps {
  userInfo: any;
  textTweet: string;
}

export const TweetItem: React.FC<TweetProps> = ({
  userInfo,
  textTweet,
}: TweetProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Paper className={classes.tweetItemRoot}>
      <Grid container spacing={2}>
        <Grid item xs={2} className={classes.tweetLeftSide}>
          <Avatar
            alt="User avatar"
            src={userInfo.avatarUrl}
            className={classes.userAvatar}></Avatar>
        </Grid>
        <Grid item xs={9} className={classes.tweetRightSide}>
          <div className={classes.tweetUserInfo}>
            <b>{userInfo.userName}</b>
            <CheckCircleSharpIcon color="primary" />
            <Typography className={classes.tweetUserInfoLogin}>
              {userInfo.login} · {userInfo.published}
            </Typography>
          </div>

          <div className={classes.tweetContentBlock}>
            <Typography className={classes.tweetContentBlockSimpleText}>{textTweet}</Typography>
          </div>

          <div className={classes.tweetActionsBlock}>
            <div className={classes.tweetActionsBlockItem}>
              <IconButton aria-label="comment" className={classes.tweetActionsBlockItemButton}>
                <ChatBubbleOutlineRoundedIcon className={classes.tweetActionIcon} />
              </IconButton>
              <span>3 тыс.</span>
            </div>
            <div className={classes.tweetActionsBlockItem}>
              <IconButton aria-label="repost" className={classes.tweetActionsBlockItemButton}>
                <RepeatRoundedIcon className={classes.tweetActionIcon} />
              </IconButton>
              <span>3.5 тыс.</span>
            </div>
            <div className={classes.tweetActionsBlockItem}>
              <IconButton aria-label="like" className={classes.tweetActionsBlockItemButton}>
                <FavoriteBorderRoundedIcon className={classes.tweetActionIcon} />
              </IconButton>
              <span>6 тыс.</span>
            </div>
            <div className={classes.tweetActionsBlockItem}>
              <IconButton aria-label="share" className={classes.tweetActionsBlockItemButton}>
                <ReplyRoundedIcon className={classes.tweetActionIcon} />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="delete" className={classes.tweetMoreActionsButton}>
            <MoreHorizRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};
