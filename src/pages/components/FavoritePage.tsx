import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MainTopBar } from '../../components/Main/common/MainTopBar';
import { TweetFeed } from '../../components/Main/TweetFeed';
import { CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Tweet } from '../../store/ducks/tweets/contracts/state';
import { LoadingState } from '../../store/ducks/search/contracts/state';
import { fetchFavoriteTweets } from '../../store/ducks/favorite/actionCreators';
import {
  selectFavoriteItems,
  selectFavoriteLoadingState,
} from '../../store/ducks/favorite/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TweetsLoader: {
      display: 'block',
      margin: '20px auto',
    },
    favoritesTitle: {
      margin: '15px 0 15px 25px',
    },
  }),
);

export const FavoritePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteTweets());
  }, []);

  const tweetsList: Tweet[] = useSelector(selectFavoriteItems);
  const tweetsLoading: boolean = useSelector(selectFavoriteLoadingState) === LoadingState.LOADING;

  return (
    <>
      <MainTopBar text={`Закладки`} arrowBack={true} />

      {tweetsLoading ? (
        <CircularProgress className={classes.TweetsLoader} disableShrink />
      ) : (
        <>
          <Typography variant="h5" className={classes.favoritesTitle}>
            Понравившиеся вам публикации:
          </Typography>
          <TweetFeed tweetsList={tweetsList} tweetsLoading={tweetsLoading} noActions />
        </>
      )}
    </>
  );
};
