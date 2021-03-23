import axios from 'axios';
import { setTweets, setTweetsLoading, TweetsActionsType } from './actionCreators';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState, Tweet } from './contracts/state';

const Api = '/data/tweets.json';
const getTweets = () => {
  return axios.get(Api).then((response) => response.data);
};


export function* tweetsSagaWatcher() {
  yield takeEvery(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
}

export function* fetchTweetsRequest() {
  try {
    const items: Tweet[] = yield call(getTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoading(LoadingState.ERROR));
    console.log(error);
  }
}
