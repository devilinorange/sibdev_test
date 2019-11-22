/* eslint-disable */

import users from '../users';

const nJwt = require('njwt');

// ПРОВЕРЯЕМ ЕСТЬ ЛИ ПОЛЬЗОВАТЕЛЬ В ЧИСЛЕ "ЗАРЕГЕСТРИРОВАННЫХ" И ГЕНЕРИРУЕМ ТОКЕН
export default (login, password) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].login === login && users[i].password === password) {
      const payload = {
        "username": users[i].username,
      };
      const jwt = nJwt.create(payload, "secret", "HS256");
      return(jwt.compact());
    }
  };
  return('');
};
