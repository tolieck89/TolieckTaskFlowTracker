import * as Yup from 'yup';



const validationSchema = Yup.object({
  title: Yup.string()
    .required('Назва обовʼязкова')
    .min(3, 'Мінімум 3 символи'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(['todo', 'in-progress', 'done']),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high']),
  assignedTo: Yup.string().nullable(),
  projectId: Yup.mixed()
    .required('Оберіть проєкт'),
});

export default validationSchema;