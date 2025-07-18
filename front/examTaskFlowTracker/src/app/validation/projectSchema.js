import * as Yup from 'yup';



const projectValidationSchema = Yup.object({
  name: Yup.string()
    .required('Назва обовʼязкова')
    .min(3, 'Мінімум 3 символи'),
  description: Yup.string() 
  .required('Опис обов\'язковий')
    .min(20, 'Мінімум 20 символів'),
  issueTypes: Yup.mixed()
   .required('Оберіть проєкт'),
   taskType: Yup.string().required('Оберіть тип задачі'),

});

export default projectValidationSchema;