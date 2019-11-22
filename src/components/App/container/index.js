import { connect } from 'react-redux';

import App from '../index';
import { actionLogin } from '../../../store/session/actions';
import { actionLoadRequest } from '../../../store/requests/actions';

const mapStateToProps = (state) => ({
  token: state.session.token,
  username: state.session.username,
});

const AppContainer = connect(mapStateToProps, { actionLogin, actionLoadRequest })(App);

export default AppContainer;
