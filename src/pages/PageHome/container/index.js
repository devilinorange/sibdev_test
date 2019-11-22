import { connect } from 'react-redux';

import PageHome from '../index';
import fetchVideos from '../../../store/videos/actions';

const mapStateToProps = (state) => ({
  isFetching: state.videos.isFetching,
  error: state.videos.error,
  videos: state.videos.videos,
});

const PageHomeContainer = connect(mapStateToProps, { fetchVideos })(PageHome);

export default PageHomeContainer;
