import * as Yup from 'yup';

export const institutSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно для заполнения'),
  speciality: Yup.string().required('Специальность обязательна для заполнения'),
  start: Yup.string().required('Дата начала обязательна для заполнения'),
  finish: Yup.string()
    .nullable()
    .when('start', (start, schema) => {
      return start ? schema.min(start, 'Дата окончания должна быть позже даты начала') : schema;
    }),
  cv_id: Yup.string().required('ID резюме обязательно для заполнения'),
});
