import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import ContentRoute from '../../routers/ContentRoute/index';
import MenuBarContainer from '../MenuBar/container/index';

const App = (props) => {
  const { actionLogin, username, actionLoadRequest } = props;
  const { pathname } = useLocation();


  //  СМОТРИМ ЕСТЬ ЛИ ТОКЕН В localStorage

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      actionLogin(token);
    }
  }, [actionLogin]);


  //  ПОДГРУЖАЕМ ЗАПРОСЫ ПОЛЬЗОВАТЕЛЯ ИЗ localStorage
  useEffect(() => {
    if (username) {
      actionLoadRequest(username);
    }
  }, [username, actionLoadRequest]);

  return (
    <>
      {pathname === '/login' ? (
        <ContentRoute />
      ) : (
        <Layout className="layout">
          <Layout.Header className="header">
            <div className="content">
              <MenuBarContainer />
            </div>
          </Layout.Header>
          <Layout.Content className="content-body">
            <div className="content">
              <ContentRoute />
            </div>
          </Layout.Content>
        </Layout>
      )}
    </>
  );
};

App.propTypes = {
  actionLogin: PropTypes.func.isRequired,
  actionLoadRequest: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default App;
