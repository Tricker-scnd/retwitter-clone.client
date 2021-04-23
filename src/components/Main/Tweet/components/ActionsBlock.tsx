import React from 'react';
import { IconButton } from '@material-ui/core';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { Tweet } from '../../../../store/ducks/tweets/contracts/state';
import { formatNumberLikes } from '../../../../utils/formatNumber';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        color: 'rgb(90,162,93)',
        '& svg': {
          color: theme.palette.primary.main,
        },
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
  }),
);

interface ActionsBlockProps {
  fullTweet?: boolean;
  fullTweetData?: Tweet;
  tweetListKey?: number;
  shareHandler: (e: any, link: string) => void;
  likeHandler: (
    e: React.MouseEvent<HTMLElement>,
    pageFullTweet: boolean,
    fullTweetData: Tweet,
    idTweet?: string,
    tweetListKey?: number,
  ) => void;
}

export const ActionsBlock = ({
  fullTweet,
  fullTweetData,
  tweetListKey,
  likeHandler,
  shareHandler,
}: ActionsBlockProps): React.ReactElement => {
  const classes = useStyles();

  const retweetHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const answerHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const tweetLink = `${window.location.origin}/${fullTweetData?.user.login}/status/${fullTweetData?._id}`;

  return (
    <>
      {fullTweet ? (
        <div className={classes.tweetActionsBlock}>
          <div className={classes.tweetActionsBlockItem}>
            <IconButton aria-label="comment" className={classes.tweetActionsBlockItemButton}>
              <ChatBubbleOutlineRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
          </div>
          <div className={classes.tweetActionsBlockItem}>
            <IconButton aria-label="repost" className={classes.tweetActionsBlockItemButton}>
              <RepeatRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
          </div>
          <div
            className={classes.tweetActionsBlockItem}
            onClick={(e) => likeHandler(e, fullTweet, fullTweetData!)}>
            <IconButton aria-label="like" className={classes.tweetActionsBlockItemButton}>
              {fullTweetData?.liked ? (
                <FavoriteIcon color="primary" className={classes.tweetActionIcon} />
              ) : (
                <FavoriteBorderRoundedIcon className={classes.tweetActionIcon} />
              )}
            </IconButton>
          </div>
          <div className={classes.tweetActionsBlockItem}>
            <IconButton aria-label="share" className={classes.tweetActionsBlockItemButton}>
              <ReplyRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={classes.tweetActionsBlock}>
          <div className={classes.tweetActionsBlockItem} onClick={answerHandler}>
            <IconButton aria-label="comment" className={classes.tweetActionsBlockItemButton}>
              <ChatBubbleOutlineRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
            <span>3 тыс.</span>
          </div>
          <div className={classes.tweetActionsBlockItem} onClick={retweetHandler}>
            <IconButton aria-label="repost" className={classes.tweetActionsBlockItemButton}>
              <RepeatRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
            <span>3.5 тыс.</span>
          </div>
          <div
            className={classes.tweetActionsBlockItem}
            onClick={(e) =>
              likeHandler(e, !!fullTweet, fullTweetData!, fullTweetData?._id, tweetListKey)
            }>
            <IconButton aria-label="like" className={classes.tweetActionsBlockItemButton}>
              {fullTweetData?.liked ? (
                <FavoriteIcon color="primary" className={classes.tweetActionIcon} />
              ) : (
                <FavoriteBorderRoundedIcon className={classes.tweetActionIcon} />
              )}
            </IconButton>
            <span>{fullTweetData?.likesCount && formatNumberLikes(fullTweetData.likesCount)}</span>
          </div>
          <div
            className={classes.tweetActionsBlockItem}
            onClick={(e) => shareHandler(e, tweetLink)}>
            <IconButton aria-label="share" className={classes.tweetActionsBlockItemButton}>
              <ReplyRoundedIcon className={classes.tweetActionIcon} />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
};
