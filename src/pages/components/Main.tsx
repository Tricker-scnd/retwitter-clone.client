import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TweetFeed } from '../../components/Main/TweetFeed';
import { TweetCreate } from '../../components/Main/Tweet/create';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState, Tweet } from '../../store/ducks/tweets/contracts/state';
import { selectLoadingState, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    delimetr: {
      backgroundColor: 'rgb(247, 249, 250)',
      height: '12px',
      borderBottom: '1px solid rgb(235, 238, 240)',
    },
  }),
);

export const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tweetsList: Tweet[] = useSelector(selectTweetsItems);
  const tweetsLoading: boolean = useSelector(selectLoadingState) === LoadingState.LOADING;

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <>
      <TweetCreate />
      <div className={classes.delimetr}></div>
      <TweetFeed tweetsList={tweetsList} tweetsLoading={tweetsLoading} />
    </>
  );
};
