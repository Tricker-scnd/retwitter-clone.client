import { TweetsActionsType } from "./actionCreators";
import {takeEvery} from 'redux-saga/effects'


const Api = '/data/tweets.json'

export function* fetchTweetsRequest(){
    console.log('testSaga');
}

export function* mySaga() {
   yield takeEvery(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
 }