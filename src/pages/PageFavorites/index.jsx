import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { List, Button, Modal } from 'antd';

import SaveFormContainer from '../../components/SaveForm/container/index';

const PageFavorites = (props) => {
  const [needRedirect, setNeedRedirect] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  // ЭТОТ СТЕЙТ ОТВЕЧАЕТ ЗА ТОТ ЗАПРОС КОТОРЫЙ БУДЕМ РЕДАКТИРОВАТЬ
  const [itemCh, setItem] = useState(null);

  const {
    requests,
    fetchVideos,
    username,
    actionRemoveRequest,
  } = props;

  // ВЫПОЛНИТЬ ЗАПРОС
  const handleStart = (terms, sort, maxcount) => {
    fetchVideos(terms, sort, maxcount);
    setNeedRedirect(true);
  };

  // ИЗМЕНИТЬ ЗАПРОС
  const handleChange = (item) => {
    setItem(item);
    setVisibleModal(true);
  };

  // УДАЛИТЬ ЗАПРОС
  const handleRemove = (id) => {
    actionRemoveRequest(id, username);
  };

  if (needRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <List
        style={{ backgroundColor: '#fff', color: '#000', fontSize: '18px' }}
        bordered
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button className="button button_start" onClick={() => handleStart(item.terms, item.order, item.maxCount)}>Выполнить</Button>,
              <Button className="button button_change" onClick={() => handleChange(item)}>Изменить</Button>,
              <Button className="button button_remove" onClick={() => handleRemove(item.id)}>Удалить</Button>,
            ]}
          >
            <List.Item.Meta
              title={<p style={{ fontSize: '18px', color: 'black' }}>{item.search_name}</p>}
            />
          </List.Item>
        )}
      />
      {!!itemCh && (  //ПРОВЕРКА ПУСТА ЛИ ПЕРЕМЕННАЯ ЗАПРОСА ВО ИЗБЕЖАНИЕ ОШИБОК
        <Modal
          title="Изменить запрос"
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={null}
          style={{ width: '30%' }}
        >
          <SaveFormContainer
            onCancel={() => {
              setVisibleModal(false);
              setItem(null);
            }}
            onSubmitHelper={() => {
              setVisibleModal(false);
              setItem(null);
            }}
            mode="change"
            item={itemCh}
          />
        </Modal>
      )}
    </>
  );
};

PageFavorites.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchVideos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  actionRemoveRequest: PropTypes.func.isRequired,
};

export default PageFavorites;
