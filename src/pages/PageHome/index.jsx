import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Input,
  message,
  Col,
  Row,
  Icon,
} from 'antd';

import VideoItem from './components/VideoItem/index';
import SavePopover from './components/SavePopover/index';

const PageHome = (props) => {
  const [terms, setTerms] = useState('');
  const [viewType, setViewType] = useState('grid');

  const {
    fetchVideos,
    isFetching,
    error,
    videos,
    config,
  } = props;

  // ПОЛУЧАЕМ КЛЮЧЕВЫЕ СЛОВА ДЛЯ ТОГО ЧТОБЫ ОТОБРАЖАТЬ ИХ В "ВИДЕО ПО ЗАПРОСУ" ДЛЯ ТОГО ЧТОБЫ МЫ МОГЛИ ИХ ОТОБРАЖАТЬ И ПРИ ВЫПОЛНЕНИИ СОХРАНЕННЫХ ЗАПРОСОВ
  useEffect(() => {
    if (config) {
      setTerms(config.params.q);
    }
  }, [config]);

  // ЗАПРОС К YOUTUBE
  const handleSearch = (value) => {
    fetchVideos(value, 'relevance', 12);
    setTerms(value);
  };

  if (error) {
    message.error(error);
  }

  return (
    <>
      <div className={!videos.length ? 'search_main' : 'search_second'}>
        <Typography.Title
          style={!videos.length ? { marginBottom: '1.5em' } : { marginTop: '1em' }}
          level={!videos.length ? 1 : 2}
        >
          Поиск видео
        </Typography.Title>
        <Input.Search
          placeholder="Что хотите посмотреть?"
          enterButton="Найти"
          size="large"
          onSearch={handleSearch}
          loading={isFetching}
          suffix={(
            <>
              {!!videos.length && (
                <SavePopover terms={terms} />
              )}
            </>
          )}
        />
      </div>
      {!!videos.length && (
        <>
          <div className="filter">
            <span>
              Видео по запросу
              <b>
                &nbsp;
                &ldquo;
                {config ? config.params.q : ''}
                &ldquo;
              </b>
              &nbsp;
              Количество:
              &nbsp;
              {videos.length}
            </span>
            <div className="filter_right">
              <Icon
                name="list"
                className={viewType === 'list' ? 'filter__icon filter__icon_active' : 'filter__icon'}
                type="bars"
                onClick={() => setViewType('list')}
              />
              <Icon
                name="grid"
                className={viewType === 'grid' ? 'filter__icon filter__icon_active' : 'filter__icon'}
                type="appstore"
                onClick={() => setViewType('grid')}
              />
            </div>
          </div>
          {viewType === 'grid' ? (
            <Row type="flex" gutter={[16, 16]} style={{ margin: '0' }}>
              {videos.map((el) => (
                <Col key={el.id} span={6}>
                  <VideoItem
                    list={viewType === 'list'}
                    id={el.id}
                    thumbnail={el.snippet.thumbnails.medium.url}
                    title={el.snippet.title}
                    channel={el.snippet.channelTitle}
                    viewCount={el.statistics.viewCount}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <>
              {videos.map((el) => (
                <Row key={el.id} style={{ width: '66%', margin: 0 }} gutter={[0, 16]}>
                  <Col span={24}>
                    <VideoItem
                      list={viewType === 'list'}
                      id={el.id}
                      thumbnail={el.snippet.thumbnails.medium.url}
                      title={el.snippet.title}
                      channel={el.snippet.channelTitle}
                      viewCount={el.statistics.viewCount}
                    />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

PageHome.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.objectOf(PropTypes.any),
};

PageHome.defaultProps = {
  config: {},
};

export default PageHome;
