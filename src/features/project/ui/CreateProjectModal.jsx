import {Button} from  "antd";
import {Modal} from  "antd";
import {Input} from  "antd";
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import { useCreateProjectMutation } from '../../../entities/cv/index.js';
import { createProjectSchema } from '../model/createJobSchema.js';

const CreateProjectModal = ({ open, onClose, onOk }) => {
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
  const [creteProject] = useCreateProjectMutation();
  const { cv_id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      link: '',
      cv_id,
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      try {
        await creteProject(values).unwrap();
        formik.resetForm();
        openSuccessNotify('Проект добавлен');
      } catch (e) {
        console.error(e);
        openErrorNotify('Ошибка запроса');
      }
    },
  });

  const onCreate = () => {
    formik.submitForm().then(() => {
      onOk?.();
    });
  };

  return (
    <>
      <Modal
        open={open}
        title={'Добавить проект'}
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
        <label htmlFor={'name'}>Название проекта:</label>
        <Input
          style={{ height: 35 }}
          name={'name'}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label htmlFor={'description'}>О проекте:</label>
        <Input
          style={{ height: 35 }}
          name={'description'}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <label htmlFor={'link'}>Ссылка на проект:</label>
        <Input
          style={{ height: 35 }}
          name={'link'}
          value={formik.values.link}
          onChange={formik.handleChange}
        />
      </Modal>
      {contextHolder}
    </>
  );
};

export default CreateProjectModal;
