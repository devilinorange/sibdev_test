import * as t from './actionTypes';

const initialState = {
  token: '',
  username: '',
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case t.LOG_OUT:
      return {
        ...state,
        token: '',
        username: '',
      };
    default:
      return state;
  }
};

export default sessionReducer;
