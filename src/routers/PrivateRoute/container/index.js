import { connect } from 'react-redux';

import PrivateRoute from '../index';

const mapStateToProps = (state) => ({
  username: state.session.username,
});

const PrivateRouteContainer = connect(mapStateToProps)(PrivateRoute);

export default PrivateRouteContainer;
