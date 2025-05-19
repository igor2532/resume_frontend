import {Button} from  "antd";
import {Modal} from  "antd";
import React from 'react';

const StyleModal = ({ open, onClose, onOk }) => {
  const styles = ['botania, default,'];

  return (
    <Modal
      open={open}
      title={'Добавить место работы'}
      onClose={onClose}
      footerActions={[
        <Button onClick={onClose} key={1}>
          Отмена
        </Button>,
        <Button buttonType="primary" key={2} onClick={onOk}>
          Ок
        </Button>,
      ]}
    ></Modal>
  );
};

export default StyleModal;
