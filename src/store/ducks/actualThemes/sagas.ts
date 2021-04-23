import { setActualThemes, setActualThemesLoading, ActualThemesActionsType } from './actionCreators';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LoadingState, ActualThemesFetchResult } from './contracts/state';
import { getActualThemes } from '../../../services/api/ActualThemesApi';

export function* ActualThemesSagaWatcher() {
  yield takeEvery(ActualThemesActionsType.FETCH_ITEMS, fetchActualThemesRequest);
}

export function* fetchActualThemesRequest() {
  try {
    const themesResult: ActualThemesFetchResult = yield call(getActualThemes);
    if (themesResult.status === 'success') yield put(setActualThemes(themesResult.data));
  } catch (error) {
    yield put(setActualThemesLoading(LoadingState.ERROR));
  }
}
