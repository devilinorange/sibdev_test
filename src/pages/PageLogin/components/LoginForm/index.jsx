import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
} from 'antd';

import logo from '../../../../images/sibdev-logo.png';
import loginFunction from '../../../../utils/loginFunction';

const LoginForm = (props) => {
  const { form, token, actionLogin } = props;

  const {
    getFieldDecorator,
    validateFields,
    setFields,
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const verify = loginFunction(values.login, values.password);
        if (verify) {
          actionLogin(verify);
        } else {
          setFields({
            login: {
              value: '',
              errors: null,
            },
            password: {
              value: '',
              errors: [new Error('Неверный логин или пароль!!!')],
            },
          });
        }
      }
    });
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit} labelAlign="right" className="login-form">
      <img src={logo} alt="logo" className="login-form__logo" />
      <Typography.Title level={3} className="login-form__title">Вход</Typography.Title>
      <Form.Item label="Логин" className="login-form__item">
        {getFieldDecorator('login', {
          rules: [{ required: true, message: 'Введите логин' }],
        })(
          <Input placeholder="Ваш логин" />,
        )}
      </Form.Item>
      <Form.Item label="Пароль" className="login-form__item">
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Введите пароль' }],
        })(
          <Input.Password placeholder="Ваш пароль" />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form__submit-button">Войти</Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
  actionLogin: PropTypes.func.isRequired,
};

export default Form.create({})(LoginForm);
