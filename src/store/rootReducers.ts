import {combineReducers} from 'redux'
import { tweetsReducer } from "./ducks/tweets/reducer";

const rootReducer = combineReducers({
    tweets: tweetsReducer
});

export default rootReducer;