import { connect } from 'react-redux';

import PageFavorites from '../index';
import fetchVideos from '../../../store/videos/actions';
import { actionRemoveRequest } from '../../../store/requests/actions';

const mapStateToProps = (state) => ({
  requests: state.requests.requests,
  username: state.session.username,
});

const mapDispatchToProps = {
  fetchVideos,
  actionRemoveRequest,
};

const PageFavoritesContainer = connect(mapStateToProps, mapDispatchToProps)(PageFavorites);

export default PageFavoritesContainer;
