import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from 'redux-saga/effects';
import { getUserTweets } from '../../../services/api/TweetsApi';
import { UsersApi } from '../../../services/api/UsersApi';
import { Tweet } from '../tweets/contracts/state';
import {
  GetSpecialUserInterface,
  GetSpecialUserTweetsInterface,
  SetSpecialUser,
  SetSpecialUserTweets,
  SetStatusSpecialUser,
  UsersActionType,
} from './actionCreators';
import { SpecialUserLoadingState, SpecialUserState } from './contracts/state';

export function* specialUserSagaWatcher() {
  yield takeEvery(UsersActionType.GET_USER_PROFILE, FetchGetUserInfo);
  yield takeEvery(UsersActionType.GET_USER_TWEETS, FetchGetUserTweets);
}

export function* FetchGetUserInfo({ payload }: GetSpecialUserInterface) {
  try {
    yield put(SetStatusSpecialUser(SpecialUserLoadingState.LOADING));
    const fetchUserResult: { data: SpecialUserState } = yield call(UsersApi.getProfile, payload);
    yield put(SetSpecialUser(fetchUserResult.data.user!));
  } catch (error) {}
}

export function* FetchGetUserTweets({ payload }: GetSpecialUserTweetsInterface) {
  try {
    const fetchUserTweetsResult: { data: Tweet[] } = yield call(getUserTweets, payload);
    yield put(SetSpecialUserTweets(fetchUserTweetsResult.data));
  } catch (error) {}
}
