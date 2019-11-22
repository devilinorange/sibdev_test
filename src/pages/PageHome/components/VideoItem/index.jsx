import React from 'react';
import PropTypes from 'prop-types';

import viewCountFunc from '../../../../utils/viewCountFunc';

const VideoItem = (props) => {
  const {
    id,
    thumbnail,
    title,
    channel,
    viewCount,
    list,
  } = props;

  return (
    <a href={`https://www.youtube.com/watch?v=${id}`} rel="noopener noreferrer" target="_blank" className={list ? 'videoItem  videoItem_list' : 'videoItem'}>
      <img className="videoItem__thumbnail" width={list ? '22%' : '100%'} src={thumbnail} alt="thumbnail" />
      <div className="videoItem__info">
        <span className="videoItem__info__title">{title}</span>
        <div className="videoItem__info__description">
          <span className="videoItem__info__channel">{channel}</span>
          <span className="videoItem__info__view">{viewCountFunc(viewCount)}</span>
        </div>
      </div>
    </a>
  );
};

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  list: PropTypes.bool.isRequired,
};

export default VideoItem;
