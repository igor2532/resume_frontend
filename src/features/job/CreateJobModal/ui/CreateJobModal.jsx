import {Button} from  "antd";
import {Input} from  "antd";
import {DatePicker} from  "antd";
import {Modal} from  "antd";
import { useState } from 'react';
import { Form, notification } from 'antd';
import { useCreateJobMutation } from '/src/entities/cv';
import { useParams } from 'react-router-dom';

export const CreateJobModal = ({ open, onClose, onOk }) => {
  const [api, contextHolder] = notification.useNotification();
  const openErrorNotify = (error) => {
    api.error({
      message: error,
      duration: 3,
    });
  };

  const openSuccessNotify = (message) => {
    api.success({
      message: message,
      duration: 3,
    });
  };

  const [createJob] = useCreateJobMutation();
  const [name, setJobName] = useState('');
  const [commitment, setCommitment] = useState('');
  const [start, setStart] = useState(null);
  const [finish, setFinish] = useState(null);
  const { cv_id } = useParams();

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const clearData = () => {
    setJobName('');
    setCommitment('');
    setStart('');
    setFinish('');
  };

  const onClickAdd = async () => {
    try {
      await createJob({
        name,
        commitment,
        start,
        finish,
        cv_id: +cv_id,
      }).unwrap();
      openSuccessNotify('Место работы добавлено');
    } catch (e) {
      openErrorNotify('Ошибка создания');
    } finally {
      onOk();
      clearData();
    }
  };

  return (
    <Modal
      open={open}
      title={'Добавить место работы'}
      onClose={() => {
        onClose();
        clearData();
      }}
      footerActions={[
        <Button
          onClick={() => {
            onClose();
            clearData();
          }}
          key={1}
        >
          Отмена
        </Button>,
        <Button buttonType="primary" key={2} onClick={onClickAdd}>
          Подтвердить
        </Button>,
      ]}
    >
      {contextHolder}
      <Form>
        <p>Название организации:</p>
        <Input
          style={{ height: 35 }}
          value={name}
          onChange={(data) => {
            setJobName(data.target.value);
          }}
        />
        <p>Род деятельности:</p>
        <Input
          style={{ height: 35 }}
          value={commitment}
          onChange={(data) => {
            setCommitment(data.target.value);
          }}
        />
        <p>Начало работы:</p>
        <DatePicker
          style={{ height: 35 }}
          onChange={(date) => {
            console.log(formatDate(date));
            setStart(formatDate(date));
          }}
        ></DatePicker>
        <p>Конец:</p>
        <DatePicker
          style={{ height: 35 }}
          onChange={(date) => {
            setFinish(formatDate(date));
          }}
        ></DatePicker>
      </Form>
    </Modal>
  );
};
