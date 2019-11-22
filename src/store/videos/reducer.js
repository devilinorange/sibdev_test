import * as t from './actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  videos: [],
  config: null,
};

const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true,
        config: null,
        error: '',
      };
    case t.FETCH_VIDEOS_RESPONSE:
      return {
        ...state,
        isFetching: false,
        config: action.payload.config,
        videos: action.payload.data,
      };
    case t.FETCH_VIDEOS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videosReducer;
