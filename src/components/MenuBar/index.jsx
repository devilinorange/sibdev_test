import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import logo from '../../images/sibdev-logo.png';

const MenuBar = (props) => {
  const [link, setLink] = useState('home');
  const [needRedirect, setNeedRedirect] = useState(false);

  const { actionLogout } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        setLink('home');
        break;
      case '/favorites':
        setLink('favorites');
        break;
      default:
        setLink('home');
    }
  }, [pathname]);

  const handleClick = () => {
    actionLogout();
    setNeedRedirect(true);
  };

  if (needRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="menu__item__logo">
        <img width="48px" src={logo} alt="logo" />
      </div>
      <Menu selectedKeys={link} mode="horizontal" className="menu" style={{ height: '80px' }}>
        <Menu.Item key="home" className="menu__item">
          <span className="menu__item__title">Поиск</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="favorites" className="menu__item">
          <span className="menu__item__title">Избранное</span>
          <Link to="/favorites" />
        </Menu.Item>
        <Menu.Item className="menu__item menu__item_right" onClick={handleClick}>
          <span className="menu__item__title">Выйти</span>
        </Menu.Item>
      </Menu>
    </>
  );
};

MenuBar.propTypes = {
  actionLogout: PropTypes.func.isRequired,
};

export default MenuBar;
