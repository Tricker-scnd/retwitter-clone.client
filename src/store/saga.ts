import { all } from 'redux-saga/effects';
import { ActualThemesSagaWatcher } from './ducks/actualThemes/sagas';
import { currentUserSagaWatcher } from './ducks/currentUser/sagas';
import { favoriteSagaWatcher } from './ducks/favorite/sagas';
import { SearchSagaWatcher } from './ducks/search/sagas';
import { tweetSagaWatcher } from './ducks/tweet/sagas';
import { tweetsSagaWatcher } from './ducks/tweets/sagas';
import { specialUserSagaWatcher } from './ducks/users/sagas';

export default function* rootSaga() {
  yield all([
    tweetsSagaWatcher(),
    tweetSagaWatcher(),
    ActualThemesSagaWatcher(),
    currentUserSagaWatcher(),
    specialUserSagaWatcher(),
    SearchSagaWatcher(),
    favoriteSagaWatcher(),
  ]);
}
