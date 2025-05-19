import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import { authUserSchema } from '../utils/authUserSchema.js';
import { useAuthMutation } from '../../../../entities/user/index';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';

export const AuthForm = () => {
  const [auth, authState] = useAuthMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authUserSchema,
    onSubmit: async (data, { resetForm }) => {
      try {
        await auth(data).unwrap();
        resetForm();
        navigate('/cvs');
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Form onFinish={formik.submitForm}>
      <Form.Item
        validateStatus={(formik.touched.email && formik.errors.email && 'error') || ''}
        help={formik.touched.email && formik.errors.email && formik.errors.email}
      >
        <Input
          placeholder={'Почта'}
          name={'email'}
          size={'large'}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item
        validateStatus={(formik.touched.password && formik.errors.password && 'error') || ''}
        help={formik.touched.password && formik.errors.password && formik.errors.password}
      >
        <Input.Password
          placeholder={'Пароль'}
          name={'password'}
          size={'large'}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Button loading={authState.isLoading} type={'primary'} htmlType={'submit'} size={'large'}>
        Войти
      </Button>
      <Link to={'/register'} className={'register_link'}>
        Нет аккаунта?
      </Link>
    </Form>
  );
};
