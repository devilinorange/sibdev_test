import { combineReducers } from 'redux';

import sessionReducer from './session/reducer';
import videosReducer from './videos/reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  videos: videosReducer,
});

export default rootReducer;
