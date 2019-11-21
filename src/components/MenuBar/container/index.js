import { connect } from 'react-redux';

import MenuBar from '../index';
import { actionLogout } from '../../../store/session/actions';

const MenuBarContainer = connect(null, { actionLogout })(MenuBar);

export default MenuBarContainer;
