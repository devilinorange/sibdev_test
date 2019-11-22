import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover, Icon, Modal } from 'antd';

import SaveFormContainer from '../../../../components/SaveForm/container/index';

const SavePopover = (props) => {
  const [saved, setSaved] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const { terms } = props;

  useEffect(() => {
    setSaved(false);
  }, [terms]);

  const handleClick = () => {
    if (!saved) {
      setVisibleModal(true);
    }
  };

  const handleVisible = (visible) => {
    setVisiblePopover(visible);
  };

  return (
    <>
      <Popover
        content={(
          <div style={{ width: '220px', textAlign: 'left' }}>
            <p>Поиск сохранен в разделе избранное</p>
            <Link to="/favorites">Перейти в Избранное</Link>
          </div>
        )}
        visible={saved && visiblePopover}
        onVisibleChange={handleVisible}
        trigger="click"
      >
        <Icon style={{ fontSize: '24px', color: '#1390E5' }} type="heart" theme={saved && 'twoTone'} onClick={handleClick} disabled />
      </Popover>
      <Modal
        title="Сохранить запрос"
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={null}
        style={{ width: '30%' }}
      >
        <SaveFormContainer
          terms={terms}
          onCancel={() => setVisibleModal(false)}
          onSubmitHelper={() => {
            setVisibleModal(false);
            setSaved(true);
            setVisiblePopover(true);
          }}
          mode="save"
        />
      </Modal>
    </>
  );
};

SavePopover.propTypes = {
  terms: PropTypes.string.isRequired,
};

export default SavePopover;
