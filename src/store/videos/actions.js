import axios from 'axios';

import * as t from './actionTypes';

const KEY_API = 'AIzaSyDW60Jdp7yFuxuLqla1gbTWZAlOlmoFpxY';

const actionFetchVideosRequest = {
  type: t.FETCH_VIDEOS_REQUEST,
};

const actionFetchVideosResponse = (data, config) => ({
  type: t.FETCH_VIDEOS_RESPONSE,
  payload: {
    data,
    config,
  },
});

const actionFetchVideosFailed = (error) => ({
  type: t.FETCH_VIDEOS_FAILED,
  payload: error,
});

const fetchVideos = (terms, sort, maxcount) => (
  (dispatch) => {
    dispatch(actionFetchVideosRequest);
    // ПОДГРУЖАЕМ ВИДЕО ПО КЛЮЧЕВЫМ СЛОВАМ
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'id',
        type: 'video',
        q: terms,
        order: sort,
        maxResults: maxcount,
        key: KEY_API,
      },
    })
      .then((response) => {
        console.log(response);
        const arr = [];
        for (let i = 0; i < response.data.items.length; i += 1) {
          arr.push(response.data.items[i].id.videoId);
        }
        // ПОДГРУЖАЕМ ВИДЕО ПО ID ПОЛУЧЕННЫМ В ПРОШЛОМ ЗАПРОСЕ, ДЛЯ ТОГО ЧТОБЫ ПОЛУЧИТЬ СТАТИСТИКУ ВИДЕО(КОЛИЧЕСТВО ПРОСМОТРОВ)
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'id, snippet, statistics',
            id: arr.join(', '),
            key: KEY_API,
          },
        })
          .then((res) => {
            console.log(res);
            dispatch(actionFetchVideosResponse(res.data.items, response.config));
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
