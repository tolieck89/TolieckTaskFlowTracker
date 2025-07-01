import { Formik } from 'formik';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createProject } from './projectsSlice';

const ProjectForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        issueTypes: [],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = 'Обовʼязкове поле';
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        dispatch(createProject(values));
        resetForm();
        onSuccess(); // закриваємо модалку
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Назва"
            validateStatus={errors.name && touched.name ? 'error' : ''}
            help={errors.name && touched.name && errors.name}
          >
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
              onChange={(val) => setFieldValue('issueTypes', val)}
              placeholder="Введи типи задач"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зберегти
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
