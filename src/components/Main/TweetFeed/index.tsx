import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TweetItem } from '../Tweet';
import { likeTweetInList } from '../../../store/ducks/tweets/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { Tweet } from '../../../store/ducks/tweets/contracts/state';
import { useHistory } from 'react-router-dom';
import { selectCurrentUserInfo } from '../../../store/ducks/currentUser/selectors';
import { deleteTweet, setLikeRequest } from '../../../store/ducks/tweet/actionCreators';
import { likeTweet, pinTweetRequest } from '../../../services/api/TweetsApi';
import { NotificationAlert } from '../common/NotificationAlert';
import copy from 'copy-to-clipboard';
import { pinState } from '../../../store/ducks/tweet/contracts/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetsFeed: {
      width: '100%',
      overflow: 'hidden',
    },
    TweetsLoader: {
      display: 'block',
      margin: '10px auto',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '26px',
      marginTop: '35px',
      color: 'rgb(60, 101, 101)',
    },
  }),
);

interface tweetFeedProps {
  tweetsList: Tweet[];
  tweetsLoading: boolean;
  emptyMessage?: string;
  noActions?: boolean;
}

export const pinTweet = (event: any, tweetId: string, type: pinState) => {
  event.stopPropagation();
  event.preventDefault();
  pinTweetRequest(tweetId, type);
};

export const TweetFeed: React.FC<tweetFeedProps> = ({
  tweetsList,
  tweetsLoading,
  emptyMessage,
  noActions,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUserInfo);
  const [copyNotification, setCopyNotification] = useState(false);
  const [pinNotification, setPinNotification] = useState(false);

  const openPinNotification = () => {
    setPinNotification(true);
  };

  const shareLink = (e: any, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCopyNotification(true);
    copy(link);
  };

  const tweetLink = (login: string, id: string) => {
    history.push(`/${login}/status/${id}`);
  };

  const handleDeleteTweet = (id: string) => {
    dispatch(deleteTweet(id));
  };

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

  return (
    <>
      <div className={classes.tweetsFeed}>
        {tweetsLoading ? (
          <CircularProgress className={classes.TweetsLoader} disableShrink />
        ) : !tweetsList.length ? (
          <p className={classes.emptyMessage}>{emptyMessage}</p>
        ) : (
          tweetsList.map((t, i) => (
            <TweetItem
              TweetInfo={t}
              key={t._id}
              handleTweetClick={() => tweetLink(t.user.login, t._id)}
              ownTweet={currentUser?.login === t.user.login}
              handleDeleteTweet={handleDeleteTweet}
              listKey={i}
              likeHandler={likeHandler}
              noActions={noActions}
              shareLink={shareLink}
              pinTweet={pinTweet}
              pinnedTweet={currentUser!.pinnedTweet}
              openPinNotification={openPinNotification}
            />
          ))
        )}
        <NotificationAlert
          notification={copyNotification}
          handleClose={() => {
            setCopyNotification(false);
          }}
          message={'Ссылка скопирована'}
        />
        <NotificationAlert
          notification={pinNotification}
          handleClose={() => {
            setPinNotification(false);
          }}
          message={'Твит закреплен'}
        />
      </div>
    </>
  );
};
