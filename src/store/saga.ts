import {all} from 'redux-saga/effects'
import { tweetsSagaWatcher } from './ducks/tweets/sagas'


export default function* rootSaga() {
    yield all([
        tweetsSagaWatcher()
    ])
  }