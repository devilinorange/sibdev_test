import React, { useState } from 'react';
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

const PageHome = (props) => {
  const [terms, setTerms] = useState('');
  const [viewType, setViewType] = useState('grid');

  const {
    fetchVideos,
    isFetching,
    error,
    videos,
  } = props;

  const handleSearch = (value) => {
    fetchVideos(value);
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
                {terms}
                &ldquo;
              </b>
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
          <Row type="flex" gutter={[16, 16]} style={{ margin: '0' }}>
            {videos.map((el) => (
              <Col key={el.id} span={6}>
                <VideoItem
                  thumbnail={el.snippet.thumbnails.medium.url}
                  title={el.snippet.title}
                  channel={el.snippet.channelTitle}
                  viewCount={el.statistics.viewCount}
                />
              </Col>
            ))}
          </Row>
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
};

export default PageHome;
