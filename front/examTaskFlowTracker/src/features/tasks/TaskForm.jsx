 import {Form, Input, Button, Select} from 'antd'
import { Formik, Field } from 'formik';
import { useSelector } from 'react-redux';
import { selectUsers } from '../users/usersSelector';
import { selectProjects } from '../projects/projectsSelectors'; 
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from './TaskSlice'
import { EditFilled } from '@ant-design/icons';
import validationSchema from '../../app/validation/taskSchema'

 
const TaskForm = ({onSuccess, initialValues, mode = "create"}) => {
    const isEdit = mode === 'edit';
    const users = useSelector(selectUsers);
    const projects = useSelector(selectProjects);
    const dispatch = useDispatch();




return  (
 
 <Formik
  initialValues={ initialValues || {
    title: '',  description: '',
    status: 'todo',
    
    priority: 'medium',
assignedTo: '',
projectId: '', }}
      validationSchema={validationSchema}

  onSubmit={(values, {resetForm}) => {
      if(isEdit){
        dispatch(updateTask(values))
      } else {
        dispatch(createTask(values));}
     resetForm();
    console.log(values)
    onSuccess();}}
>
  {({handleSubmit,  values, handleChange, setFieldValue}) => (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Field name="title">
        {({ field, meta }) => (
          <Form.Item
            label="Назва задачі"
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={meta.touched && meta.error ? meta.error : ''}
          >
            <Input {...field} placeholder="Наприклад: зварити каву" />
          </Form.Item>
        )}
        </Field>
      
      <Form.Item label="Опис">
    <Input.TextArea
        name="description"
        value={values.description}
        onChange={handleChange}
    />
    </Form.Item>

<Form.Item label="Статус">
  <Select
    name="status"
    value={values.status}
    onChange={(value) => setFieldValue('status', value)}
  >
    <Select.Option value="todo">Очікує</Select.Option>
    <Select.Option value="in-progress">В процесі</Select.Option>
    <Select.Option value="done">Завершено</Select.Option>
  </Select>
</Form.Item>

<Form.Item label="Пріоритет">
  <Select
    name="priority"
    value={values.priority}
    onChange={(value) => setFieldValue('priority', value)}
  >
    <Select.Option value="low">Низький</Select.Option>
    <Select.Option value="medium">Середній</Select.Option>
    <Select.Option value="high">Високий</Select.Option>
  </Select>
</Form.Item>
<Form.Item label="Виконавець">
  <Select
    name="assignedTo"
    value={values.assignedTo}
    onChange={(value) => setFieldValue('assignedTo', value)}
  >
    {users
      .filter(user => user.role === 'user' || user.role ==='admin') 
      .map(user => (
        <Select.Option key={user.id} value={user.id}>
          {user.name}
        </Select.Option>
      ))}
  </Select>
</Form.Item>
<Form.Item label="Проєкт">
  <Select
    name="projectId"
    value={values.projectId}
    onChange={(value) => setFieldValue('projectId', value)}
  >
    {projects.map(project => (
      <Select.Option key={project.id} value={project.id}>
        {project.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>




      <Button type="primary" htmlType="submit">
          {isEdit ? 'Зберегти зміни' : 'Створити'}

      </Button>
    </Form>
  )}
</Formik>
)
}

export default TaskForm;