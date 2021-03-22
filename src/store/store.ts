import { createStore, compose } from "redux";
import rootReducer from "./rootReducers";
import createSagaMiddleware from 'redux-saga'

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    compose(composeEnhancers()),
  );

export default store

