import * as yup from 'yup';

export const createProjectSchema = yup.object({
  name: yup.string().required('Поле обязательно для заполнения').trim(),
  description: yup.string().trim(),
  link: yup.string().trim(),
});
