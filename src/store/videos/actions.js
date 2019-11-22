import axios from 'axios';

import * as t from './actionTypes';

const KEY_API = 'AIzaSyA7K9yh_4TMLw10ClMtdrcnkMzqjcV2gaw';

const actionFetchVideosRequest = {
  type: t.FETCH_VIDEOS_REQUEST,
};

const actionFetchVideosResponse = (data) => ({
  type: t.FETCH_VIDEOS_RESPONSE,
  payload: data,
});

const actionFetchVideosFailed = (error) => ({
  type: t.FETCH_VIDEOS_FAILED,
  payload: error,
});

const fetchVideos = (terms) => (
  (dispatch) => {
    dispatch(actionFetchVideosRequest);
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'id',
        type: 'video',
        q: terms,
        maxResults: 12,
        key: KEY_API,
      },
    })
      .then((response) => {
        const arr = [];
        for (let i = 0; i < response.data.items.length; i += 1) {
          arr.push(response.data.items[i].id.videoId);
        }
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'id, snippet, statistics',
            id: arr.join(', '),
            key: KEY_API,
          },
        })
          .then((res) => {
            dispatch(actionFetchVideosResponse(res.data.items));
          })
          .catch((err) => {
            dispatch(actionFetchVideosFailed(err.message));
          });
      })
      .catch((error) => {
        dispatch(actionFetchVideosFailed(error.message));
      });
  }
);

export default fetchVideos;
