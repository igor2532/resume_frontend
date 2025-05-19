import * as yup from 'yup';

export const authUserSchema = yup.object({
  email: yup
    .string()
    .required('Поле обязательно для заполнения')
    .trim()
    .matches(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Введен не корректный Email',
    ),
  password: yup.string().required('Поле обязательно для заполнения').trim(),
});
