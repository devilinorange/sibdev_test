import { connect } from 'react-redux';

import PageHome from '../index';
import fetchVideos from '../../../store/videos/actions';

const mapStateToProps = (state) => ({
  isFetching: state.videos.isFetching,
  error: state.videos.error,
  videos: state.videos.videos,
  config: state.videos.config,
});

const PageHomeContainer = connect(mapStateToProps, { fetchVideos })(PageHome);

export default PageHomeContainer;
