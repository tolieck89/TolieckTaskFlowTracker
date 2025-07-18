import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addProject, editProject } from './projectsSlice';

const ProjectForm = ({ initialValues, mode = 'create', onSuccess }) => {
  const dispatch = useDispatch();
  const isEdit = mode === 'edit';

  const [form] = Form.useForm(); 

  const handleFinish = (values) => {
    console.log('📤 Сабміт:', values);

    const action = isEdit
      ? editProject({ id: initialValues.id, updates: values })
      : addProject(values);

    dispatch(action)
      .unwrap()
      .then((savedProject) => {
        form.resetFields();
        onSuccess?.(savedProject);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || { name: '', description: '', issueTypes: [] }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Назва"
        name="name"
        rules={[{ required: true, message: 'Вкажи назву проєкту' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Опис"
        name="description"
        rules={[{ required: true, message: 'Вкажи опис' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Типи задач"
        name="issueTypes"
        rules={[{ required: true, message: 'Вкажи хоча б один тип задач' }]}
      >
        <Select mode="tags" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Зберегти зміни' : 'Створити проєкт'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
  