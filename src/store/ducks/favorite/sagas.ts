import { setTweetsLoading, TweetsActionsType, setFavoriteTweets } from './actionCreators';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState, TweetsFetchResult } from './contracts/state';
import { getFavoriteTweets } from '../../../services/api/TweetsApi';

export function* favoriteSagaWatcher() {
  yield takeEvery(TweetsActionsType.FETCH_FAVORITE_TWEETS, fetchFavoriteTweetsRequest);
}

export function* fetchFavoriteTweetsRequest() {
  try {
    const tweetsResult: TweetsFetchResult = yield call(getFavoriteTweets);
    if (tweetsResult.status === 'success') yield put(setFavoriteTweets(tweetsResult.data));
  } catch (error) {
    yield put(setTweetsLoading(LoadingState.ERROR));
  }
}
