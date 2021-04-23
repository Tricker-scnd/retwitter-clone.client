import {
  AddTweetActionInterface,
  setTweets,
  setTweetsLoading,
  TweetsActionsType,
  setAddTweetLoading,
  apppendAddedTweet,
} from './actionCreators';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AddedTweetState, LoadingState, TweetsFetchResult } from './contracts/state';
import { fetchAddTweet, getTweets } from '../../../services/api/TweetsApi';

export function* tweetsSagaWatcher() {
  yield takeEvery(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeEvery(TweetsActionsType.ADD_TWEET, addTweetRequest);
}

export function* fetchTweetsRequest() {
  try {
    const tweetsResult: TweetsFetchResult = yield call(getTweets);
    if (tweetsResult.status === 'success') yield put(setTweets(tweetsResult.data));
  } catch (error) {
    yield put(setTweetsLoading(LoadingState.ERROR));
  }
}

export function* addTweetRequest({ payload }: AddTweetActionInterface) {
  try {
    yield put(setAddTweetLoading(LoadingState.LOADING));

    const formData = new FormData();
    formData.append('text', payload.text!);
    payload.images.forEach((img: File) => {
      formData.append('images', img);
    });

    const addedTweet: AddedTweetState = yield call(fetchAddTweet, formData);
    if (addedTweet.status === 'success') yield put(apppendAddedTweet(addedTweet.data));
  } catch (error) {
    yield put(setAddTweetLoading(LoadingState.ERROR));
  }
}
