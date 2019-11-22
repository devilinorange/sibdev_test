import React from 'react';

import viewCountFunc from '../../../../utils/viewCountFunc';

const VideoItem = (props) => {
  const {
    thumbnail,
    title,
    channel,
    viewCount,
  } = props;

  return (
    <div className="videoItem">
      <img className="videoItem__thumbnail" width="100%" src={thumbnail} alt="thumbnail" />
      <span className="videoItem__title">{title}</span>
      <span className="videoItem__channel">{channel}</span>
      <span className="videoItem__view">{viewCountFunc(viewCount)}</span>
    </div>
  );
};

export default VideoItem;
