import {
  SetLikeRequestActionInterface,
  setLiked,
  setTweet,
  setTweetLoading,
  TweetActionsType,
} from './actionCreators';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState, TweetFetchResult } from './contracts/state';
import { deleteTweet, getTweet, likeTweet, removeLikeTweet } from '../../../services/api/TweetsApi';
import { fetchTweets } from '../tweets/actionCreators';
import { fetchTweetsRequest } from '../tweets/sagas';

export function* tweetSagaWatcher() {
  yield takeEvery(TweetActionsType.FETCH_TWEET_DATA, fetchTweetRequest);
  yield takeEvery(TweetActionsType.DELETE_TWEET, deleteTweetRequest);
  yield takeEvery(TweetActionsType.SET_LIKE_REQUEST, likeTweetRequest);
}

export function* fetchTweetRequest(action: any) {
  const Api = `/tweet/${action.payload}`;
  try {
    const tweetResult: TweetFetchResult = yield call(getTweet, Api);

    if (tweetResult.status === 'success') yield put(setTweet(tweetResult.data));
  } catch (error) {
    yield put(setTweetLoading(LoadingState.ERROR));
    console.log(error);
  }
}

export function* deleteTweetRequest(action: any) {
  try {
    const tweetResult: TweetFetchResult = yield call(deleteTweet, action.payload);
    if (tweetResult.status === 'success') yield fetchTweetsRequest();
  } catch (error) {
    console.log(error);
  }
}

export function* likeTweetRequest({ payload }: SetLikeRequestActionInterface) {
  try {
    const { id, isLike, inList } = payload;
    if (isLike) {
      yield call(likeTweet, id);
    } else {
      yield call(removeLikeTweet, id);
    }

    if (!inList) yield put(setLiked(isLike));
  } catch (error) {
    console.log(error);
  }
}
