import * as t from './actionTypes';

const initialState = {
  isFetching: false,
  error: '',
  videos: [],
};

const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    case t.FETCH_VIDEOS_RESPONSE:
      return {
        ...state,
        isFetching: false,
        videos: action.payload,
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
