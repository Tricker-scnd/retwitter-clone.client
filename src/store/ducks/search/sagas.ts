import { call, put, takeEvery } from 'redux-saga/effects';
import { searchQuery } from '../../../services/api/SearchApi';
import {
  SearchActionsType,
  SearchRequestActionInterface,
  setSearchResult,
  setSearchStatus,
} from './actionCreators';
import { LoadingState, SearchContentFetchResult } from './contracts/state';

export function* SearchSagaWatcher() {
  yield takeEvery(SearchActionsType.SEARCH_REQUEST, fetchSearchRequest);
}

export function* fetchSearchRequest({ payload }: SearchRequestActionInterface) {
  try {
    yield put(setSearchStatus(LoadingState.LOADING));
    const searchResult: SearchContentFetchResult = yield call(searchQuery, payload);
    if (searchResult.status === 'success') yield put(setSearchResult(searchResult.data));
  } catch (error) {
    yield put(setSearchStatus(LoadingState.ERROR));
  }
}
