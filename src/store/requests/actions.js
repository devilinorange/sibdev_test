import * as t from './actionType';

export const actionSaveRequest = (body, username) => {
  localStorage.setItem(
    username,
    JSON.stringify([...JSON.parse(localStorage.getItem(username)), body]),
  );
  return {
    type: t.SAVE_REQUEST,
    payload: body,
  };
};

export const actionChangeRequest = (body, username) => {
  // СНАЧАЛА ПРОИЗВОДИМ МОДИФИКАЦИИ В localStorage А ЗАТЕМ В REDUX
  const arr = JSON.parse(localStorage.getItem(username));
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === body.id) {
      arr[i] = body;
      break;
    }
  }
  localStorage.setItem(
    username,
    JSON.stringify(arr),
  );
  return {
    type: t.CHANGE_REQUEST,
    payload: body,
  };
};

export const actionLoadRequest = (username) => {
  const requests = JSON.parse(localStorage.getItem(username)) || [];
  let id = 0;
  if (requests.length) {
    id = requests[requests.length - 1].id;
  } else {
    localStorage.setItem(username, JSON.stringify(requests));
  }
  return {
    type: t.LOAD_REQUEST,
    payload: {
      requests,
      id,
    },
  };
};

export const actionRemoveRequest = (id, username) => {
  const arr = JSON.parse(localStorage.getItem(username));
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      arr.splice(i, 1);
      break;
    }
  }
  localStorage.setItem(
    username,
    JSON.stringify(arr),
  );
  return {
    type: t.REMOVE_REQUEST,
    id,
  };
};
