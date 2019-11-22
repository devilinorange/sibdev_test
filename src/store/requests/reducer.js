import * as t from './actionType';

const initialState = {
  requests: [],
  id: 0,
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SAVE_REQUEST:
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload,
        ],
        id: state.id + 1,
      };
    case t.CHANGE_REQUEST:
      return {
        ...state,
        requests: state.requests.map((el) => {
          if (el.id !== action.payload.id) {
            return el;
          }
          return action.payload;
        }),
      };
    case t.REMOVE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((el) => el.id !== action.id),
      };
    case t.LOAD_REQUEST:
      return {
        ...state,
        requests: action.payload.requests,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export default requestsReducer;
