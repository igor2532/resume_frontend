import {Button} from  "antd";
import {Modal} from  "antd";
import {Input} from  "antd";
import {DatePicker} from  "antd";
import { useCreateInstitutMutation } from '../../../../entities/cv/index.js';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { institutSchema } from '../model/createInstitutSchema.js';
import { formatDate } from '../../../../shared/lib/formatDate';
import { notification } from 'antd';

const CreateInstitutModal = ({ open, onClose, onOk }) => {
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
  const [creteInstitut] = useCreateInstitutMutation();
  const { cv_id } = useParams();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      speciality: '',
      start: null,
      finish: null,
      cv_id,
    },
    validationSchema: institutSchema,
    onSubmit: async (values) => {
      console.log(values.start);
      const data = {
        name: values.name,
        speciality: values.speciality,
        start: values.start ? formatDate(values.start) : null,
        finish: values.finish ? formatDate(values.finish) : null,
        cv_id: +cv_id,
      };
      try {
        await creteInstitut(data).unwrap();
        formik.resetForm();
        openSuccessNotify('Образование добавлено');
      } catch (e) {
        console.error(e);
        openErrorNotify('Ошибка запроса');
      }
    },
  });

  const onCreate = async () => {
    await formik.submitForm();
    onOk?.();
  };

  return (
    <>
      <Modal
        open={open}
        title={'Образование'}
        onClose={onClose}
        footerActions={[
          <Button onClick={onClose} key={1}>
            Закрыть
          </Button>,
          <Button buttonType="primary" onClick={onCreate} key={2}>
            Подтвердить
          </Button>,
        ]}
      >
        <label htmlFor={'name'}>Название организации:</label>
        <Input
          style={{ height: 35 }}
          name={'name'}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label htmlFor={'speciality'}>Направление:</label>
        <Input
          style={{ height: 35 }}
          name={'speciality'}
          value={formik.values.speciality}
          onChange={formik.handleChange}
        />
        <label htmlFor={'start'}>Поступление:</label>
        <DatePicker
          value={formik.values.start}
          style={{ height: 35 }}
          onChange={(date) => {
            formik.setFieldValue('start', date);
          }}
        ></DatePicker>
        <label htmlFor={'finish'}>Выпуск:</label>
        <DatePicker
          value={formik.values.finish}
          style={{ height: 35 }}
          onChange={(date) => {
            formik.setFieldValue('finish', date);
          }}
        ></DatePicker>
      </Modal>
      {contextHolder}
    </>
  );
};

export default CreateInstitutModal;
