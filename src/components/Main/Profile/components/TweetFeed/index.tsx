import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectCurrentUserInfo } from '../../../../../store/ducks/currentUser/selectors';
import { Tweet } from '../../../../../store/ducks/tweets/contracts/state';
import {
  GetSpecialUserTweets,
  SetSpecialUserTweets,
} from '../../../../../store/ducks/users/actionCreators';
import { TweetItem } from '../../../Tweet';
import { deleteTweet, setLikeRequest } from '../../../../../store/ducks/tweet/actionCreators';
import { likeTweet } from '../../../../../services/api/TweetsApi';
import { likeTweetInList } from '../../../../../store/ducks/tweets/actionCreators';
import { NotificationAlert } from '../../../common/NotificationAlert';
import { pinState } from '../../../../../store/ducks/tweet/contracts/state';
import { pinTweet } from '../../../TweetFeed';
import { selectSpecialUserInfo } from '../../../../../store/ducks/users/selectors';

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
    pinnedTweet: {
      borderBottom: '14px solid rgba(196, 207, 214,0.3)',
    },
    pinnedTweetTitle: {
      paddingLeft: '20px',
      fontWeight: 800,
      paddingBottom: '0px',
      marginBottom: '0px',
    },
  }),
);

interface tweetFeedProps {
  uId?: string;
  tweetsList: Tweet[] | null;
}

export const TweetFeed: React.FC<tweetFeedProps> = ({ uId, tweetsList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectSpecialUserInfo);
  const [pinnedTweetListKey, setPinnedTweetListKey] = useState<number | null>(null);
  const [copyNotification, setCopyNotification] = useState(false);
  const [pinNotification, setPinNotification] = useState(false);

  const openPinNotification = () => {
    setPinNotification(true);
  };

  const tweetLink = (login: string, id: string) => {
    history.push(`/${login}/status/${id}`);
  };

  const handleDeleteTweet = (id: string) => {
    dispatch(deleteTweet(id));
    dispatch(GetSpecialUserTweets(uId));
  };

  const shareLink = (e: any, link: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCopyNotification(true);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (tweetsList?.length) {
      const key = tweetsList.findIndex((t) => !!t.pinned);
      if (key) {
        setPinnedTweetListKey(key);
        console.log(tweetsList[key]);
      }
    }
  }, [tweetsList]);

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
        {!tweetsList ? (
          <CircularProgress className={classes.TweetsLoader} disableShrink />
        ) : !!currentUser?.pinnedTweet ? (
          <>
            <div className={classes.pinnedTweet}>
              <p className={classes.pinnedTweetTitle}>Закрепленный твит</p>
              {!!pinnedTweetListKey && (
                <TweetItem
                  TweetInfo={tweetsList[pinnedTweetListKey]}
                  key={tweetsList[pinnedTweetListKey]._id}
                  listKey={pinnedTweetListKey}
                  handleTweetClick={() =>
                    tweetLink(
                      tweetsList[pinnedTweetListKey].user.login,
                      tweetsList[pinnedTweetListKey]._id,
                    )
                  }
                  ownTweet={currentUser?.login === tweetsList[pinnedTweetListKey].user.login}
                  handleDeleteTweet={handleDeleteTweet}
                  likeHandler={likeHandler}
                  shareLink={shareLink}
                  pinTweet={pinTweet}
                  pinnedTweet={currentUser!.pinnedTweet}
                  openPinNotification={openPinNotification}
                />
              )}
            </div>
            {tweetsList?.map((t, i) => {
              if (!!!t.pinned) {
                return (
                  <TweetItem
                    TweetInfo={{ ...t, _id: t._id }}
                    key={t._id}
                    listKey={i}
                    handleTweetClick={() => tweetLink(t.user.login, t._id)}
                    ownTweet={currentUser?.login === t.user.login}
                    handleDeleteTweet={handleDeleteTweet}
                    likeHandler={likeHandler}
                    shareLink={shareLink}
                    pinTweet={pinTweet}
                    pinnedTweet={currentUser!.pinnedTweet}
                    openPinNotification={openPinNotification}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {tweetsList?.map((t, i) => (
              <TweetItem
                TweetInfo={{ ...t, _id: t._id }}
                key={t._id}
                listKey={i}
                handleTweetClick={() => tweetLink(t.user.login, t._id)}
                ownTweet={currentUser?.login === t.user.login}
                handleDeleteTweet={handleDeleteTweet}
                likeHandler={likeHandler}
                shareLink={shareLink}
                pinTweet={pinTweet}
                pinnedTweet={currentUser!.pinnedTweet}
                openPinNotification={openPinNotification}
              />
            ))}
          </>
        )}

        <NotificationAlert
          notification={copyNotification}
          handleClose={() => {
            setPinNotification(false);
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
