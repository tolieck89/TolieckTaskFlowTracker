import { Formik } from 'formik';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createProject, updateProject } from './projectsSlice';

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
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Назва">
            <Input name="name" value={values.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Опис">
            <Input.TextArea
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Типи задач">
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