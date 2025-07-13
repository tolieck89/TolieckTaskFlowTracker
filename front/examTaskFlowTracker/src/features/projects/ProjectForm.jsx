import { Formik } from 'formik';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createProject, updateProject } from './projectsSlice';
import projectValidationSchema from '../../app/validation/projectSchema'
   const ProjectForm = ({ initialValues, mode = 'create', onSuccess }) => {
  const dispatch = useDispatch();

  const isEdit = mode === 'edit';

  return (
    <Formik
      initialValues={
        initialValues || {
          name: '',
          description: '',
          issueTypes: [],
          
        }
      }
      
      validationSchema = {projectValidationSchema}

      onSubmit={(values, { resetForm }) => {
        if (isEdit) {
          dispatch(updateProject(values));
        } else {
          dispatch(createProject(values));
        }
        resetForm();
        onSuccess();
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Назва"
           validateStatus={touched.name && errors.name ? 'error' : ''}
  help={touched.name && errors.name ? errors.name : ''}>
             
            <Input name="name" value={values.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Опис"
            validateStatus={touched.description && errors.description ? 'error' : ''}
  help={touched.description && errors.description ? errors.description : ''}>
            <Input.TextArea
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Типи задач"
            validateStatus={touched.issueTypes && errors.issueTypes ? 'error' : ''}
  help={touched.issueTypes && errors.issueTypes ? errors.issueTypes : ''}>
            <Select
              mode="tags"
              value={values.issueTypes}
              onChange={(value) => setFieldValue('issueTypes', value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEdit ? 'Зберегти зміни' : 'Створити проєкт'}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export  default  ProjectForm 