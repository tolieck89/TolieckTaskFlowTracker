// src/features/tasks/TaskDetails.jsx
import { Descriptions, Tag, Button } from 'antd';
import { useSelector } from 'react-redux';
import { selectUsers } from '../users/usersSelector';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../constants/taskOptions';
import { useDispatch } from 'react-redux';
import { editTask } from './TaskSlice'; 


const TaskDetails = ({ task }) => {
  const users = useSelector(selectUsers) || [];
  const dispatch = useDispatch();
  // const editTask = useSelector(selectTasks);
  const currentUser = useSelector((state) => state.auth.user);

const creator = users.find(u => u.id === task.createdBy);
  const updater = users.find(u => u.id === task.updatedBy);
  const assignee = users.find(u => u.id === task.assignedTo);
  if (!task) return <div>Задача не знайдена</div>;

return (
    <>
    <Descriptions  bordered column={1}>
      <Descriptions.Item label="Назва">{task?.title || '-'}</Descriptions.Item>
      <Descriptions.Item label="Опис">{task.description}</Descriptions.Item>
      <Descriptions.Item label="Статус">
      <Tag color={STATUS_COLORS[task.status]}>{task.status}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Пріоритет">
      <Tag color={PRIORITY_COLORS[task.priority]}>{task.priority}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Виконавець">{assignee?.name || '—'}</Descriptions.Item>

    
      <Descriptions.Item label="Створив">{creator?.name || '—'}</Descriptions.Item>
      <Descriptions.Item label="Оновив">{updater?.name || '—'}</Descriptions.Item>
      <Descriptions.Item label="Проєкт ID">{task.projectId}</Descriptions.Item>
    </Descriptions>

    {task.assignedTo !== currentUser?.id && (
  <Button
    type="primary"
        style={{ marginTop: 12 }}

    onClick={() => dispatch(editTask({ id: task.id, updates: { assignedTo: currentUser.id } }))}
  > Взяти задачу на себе
  </Button>
  )}
    </>
)
};

export default TaskDetails;
