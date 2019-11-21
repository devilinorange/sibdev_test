import * as t from './actionTypes';

const JwtDecode = require('jwt-decode');

export const actionLogin = (token) => {
  const { username } = JwtDecode(token);
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  return {
    type: t.LOG_IN,
    payload: {
      token, username,
    },
  };
};

export const actionLogout = () => null;
