import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import ContentRoute from '../../routers/ContentRoute/index';
import MenuBarContainer from '../MenuBar/container/index';

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/login' ? (
        <ContentRoute />
      ) : (
        <Layout>
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

export default App;
