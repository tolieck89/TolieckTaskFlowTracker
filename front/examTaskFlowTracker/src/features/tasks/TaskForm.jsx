import { Form, Input, Select, Button } from 'antd';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from './TaskSlice';
import { selectProjects } from '../projects/projectsSelectors';
import { selectUsers } from '../users/usersSelector';
import { forwardRef, useImperativeHandle } from 'react';



const { TextArea } = Input;

const TaskForm = forwardRef((props, ref) => {

  const currentUser = useSelector(state => state.auth.user); 

  const { onSuccess, initialValues = {}, mode = 'create' } = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const users = useSelector(selectUsers);

  const selectedProjectId = Form.useWatch('projectId', form);

  const issueTypes = useMemo(() => {
    const project = projects.find(p => p.id === selectedProjectId);
    return project?.issueTypes || [];
  }, [selectedProjectId, projects]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = (values) => {
      const taskData =  {
    ...values,
    ...(mode === 'create'
      ? { createdBy: currentUser?.id }
      : { updatedBy: currentUser?.id }
    )
  };

    const action = mode === 'edit'
    ? editTask({ id: initialValues.id, updates: taskData })
    : addTask(taskData);

    dispatch(action)
      .unwrap()
      .then((task) => {
        form.resetFields();
        onSuccess?.(task);
      });
 };
    useImperativeHandle(ref, () => ({
    resetFields: () => form.resetFields(),
  }));

  return (
    <Form
        preserve={false}

      layout="vertical"
      form={form}
        id="taskForm" 
      onFinish={handleFinish}
    >
      <Form.Item
        label="Назва задачі"
        name="title"
        rules={[{ required: true, message: 'Введи назву задачі' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Опис"
        name="description"
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="Проєкт"
        name="projectId"
        rules={[{ required: true, message: 'Вибери проєкт' }]}
      >
        <Select placeholder="Оберіть проєкт">
          {projects.map(project => (
            <Select.Option key={project.id} value={project.id}>
              {project.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Тип задачі"
        name="type"
        rules={[{ required: true, message: 'Оберіть тип задачі' }]}
      >
        <Select placeholder="Тип задачі динамічно">
          {issueTypes.map(type => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Статус"
        name="status"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="open">Відкрита</Select.Option>
          <Select.Option value="in progress">У процесі</Select.Option>
          <Select.Option value="done">Виконана</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Пріоритет"
        name="priority"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="low">Низький</Select.Option>
          <Select.Option value="medium">Середній</Select.Option>
          <Select.Option value="high">Високий</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Виконавець"
        name="assignedTo"
        rules={[]}
      >
        <Select placeholder="Оберіть користувача">
          {users
            .filter(user => user.role === 'user')
            .map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
  <Button
    type="link"
    onClick={() => form.setFieldsValue({ assignedTo: currentUser?.id })}
  >
    Асайнити на себе
  </Button>
</Form.Item>

      <Form.Item>
<Button type="primary" htmlType="submit" form="taskForm">
            {mode === 'edit' ? 'Зберегти зміни' : 'Створити задачу'}
        </Button>
      </Form.Item>
    </Form>
  );
})

export default TaskForm;
