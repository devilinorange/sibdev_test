import { connect } from 'react-redux';

import SaveForm from '../index';
import { actionSaveRequest, actionChangeRequest } from '../../../store/requests/actions';

const mapStateToProps = (state) => ({
  username: state.session.username,
  id: state.requests.id,
});

const SaveFormContainer = connect(
  mapStateToProps,
  { actionSaveRequest, actionChangeRequest },
)(SaveForm);

export default SaveFormContainer;
