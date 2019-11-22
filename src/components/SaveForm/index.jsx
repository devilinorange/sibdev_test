import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
} from 'antd';

const SaveForm = (props) => {
  const {
    form,
    terms,
    onCancel,
    onSubmitHelper,
    actionSaveRequest,
    actionChangeRequest,
    id,
    username,
    item,
    mode,
  } = props;

  const {
    getFieldDecorator,
    setFieldsValue,
    validateFields,
  } = form;

  //  СИНХРОНИЗАЦИЯ СЛАЙДЕРА И ЧИСЛОВОГО ИНПУТА
  const handleChange = (value) => {
    validateFields(['inputNumber'], (err) => {
      if (!err) {
        setFieldsValue({
          slider: value,
          inputNumber: value,
        });
      }
    });
  };

  // ВЫЗЫВАЕМ ЭКШН-КРЕЙТОР В ЗАВИСИМОСТИ ОТ РЕЖИМА(СОХРАНИТЬ ИЛИ ИЗМЕНИТЬ), А ТАКЖЕ ПОДСТАВЛЯЕМ НУЖНЫЙ ID В ТЕЛО ЗАПРОСА ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const body = {
          id: mode === 'save' ? id + 1 : item.id,
          terms: values.terms,
          search_name: values.search_name,
          order: values.sort,
          maxCount: values.slider,
        };
        if (mode === 'save') {
          actionSaveRequest(body, username);
        } else {
          actionChangeRequest(body, username);
        }
        onSubmitHelper();
      }
    });
  };


  // ДЕФОЛТНЫЕ ЗНАЧЕНИЯ ПОДСТАВЛЯЮТСЯ В ЗАВИСИМОСТИ ОТ РЕЖИМА
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="Запрос">
        {getFieldDecorator('terms', {
          initialValue: mode === 'save' ? terms : item.terms,
        })(
          <Input disabled={mode === 'save'} />,
        )}
      </Form.Item>
      <Form.Item label="Название">
        {getFieldDecorator('search_name', {
          rules: [{
            required: true, message: 'Введите название',
          }],
          initialValue: mode === 'save' ? '' : item.search_name,
        })(
          <Input placeholder="Введите название" />,
        )}
      </Form.Item>
      <Form.Item label="Сортировать по">
        {getFieldDecorator('sort', {
          initialValue: mode === 'save' ? 'relevance' : item.order,
        })(
          <Select placeholder="Без сортировки">
            <Select.Option value="date">Дата</Select.Option>
            <Select.Option value="rating">Рейгинг</Select.Option>
            <Select.Option value="title">Название</Select.Option>
            <Select.Option value="viewCount">Количество просмотров</Select.Option>
            <Select.Option value="relevance">Без сортировки</Select.Option>
          </Select>,
        )}
      </Form.Item>
      <Row>
        <Col span={19}>
          <Form.Item>
            {getFieldDecorator('slider', {
              initialValue: mode === 'save' ? 12 : item.maxCount,
              rules: [{
                type: 'number', message: 'Введите число 1-50',
              }],
            })(
              <Slider
                min={1}
                max={50}
                onChange={handleChange}
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            {getFieldDecorator('inputNumber', {
              initialValue: mode === 'save' ? 12 : item.maxCount,
              rules: [{
                type: 'number', message: 'Введите число 1-50',
              }],
            })(
              <InputNumber
                min={1}
                max={50}
                onChange={handleChange}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row guter={16}>
        <Col span={12}>
          <Form.Item>
            <Button style={{ width: '100%' }} onClick={onCancel}>Отмена</Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">Сохранить</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

SaveForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  terms: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSubmitHelper: PropTypes.func.isRequired,
  actionSaveRequest: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  actionChangeRequest: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  item: PropTypes.objectOf(PropTypes.any),
};

SaveForm.defaultProps = {
  item: {},
  terms: '',
};

export default Form.create({})(SaveForm);
