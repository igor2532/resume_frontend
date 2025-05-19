import * as yup from 'yup';

export const createJobSchema = yup.object({
  name: yup.string().required('Поле обязательно для заполнения').trim(),
  commitment: yup.string().required('Поле обязательно для заполнения').trim(),
  start: yup.string().trim(),
  finish: yup.string().trim(),
  cv_id: yup.string().required('CV_ID_ERROR').trim(),
});
