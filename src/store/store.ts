import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { LoadingState, TweetsState } from './ducks/tweets/contracts/state';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();



export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
