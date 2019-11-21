import { connect } from 'react-redux';

import LoginForm from '../index';
import { actionLogin } from '../../../../../store/session/actions';

const mapStateToProps = (state) => ({
  token: state.session.token,
});

const LoginFormContainer = connect(mapStateToProps, { actionLogin })(LoginForm);

export default LoginFormContainer;
