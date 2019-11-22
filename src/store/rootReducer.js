import { combineReducers } from 'redux';

import sessionReducer from './session/reducer';
import videosReducer from './videos/reducer';
import requestsReducer from './requests/reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  videos: videosReducer,
  requests: requestsReducer,
});

export default rootReducer;
