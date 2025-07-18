import { useSelector, useDispatch } from 'react-redux';
import { List, Card, Button, Popconfirm, Tag } from 'antd';
import { removeTask } from './TaskSlice'; 
import { selectTasks } from './tasksSelectors'; 
import { useState, useMemo } from 'react';
import TaskFormModal from './TaskFormModal';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../constants/taskOptions';
import { selectUsers } from '../users/usersSelector'; 
import { selectProjects } from '../projects/projectsSelectors';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const users = useSelector(selectUsers); 
  const projects = useSelector(selectProjects);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const statusFilter = searchParams.get('status');
  const priorityFilter = searchParams.get('priority');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const byStatus = statusFilter ? task.status === statusFilter : true;
      const byPriority = priorityFilter ? task.priority === priorityFilter : true;
      return byStatus && byPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        {(statusFilter || priorityFilter) && (
          <Button onClick={() => navigate('/tasks')}>Очистити фільтри</Button>
        )}
      </div>

      <List 
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <Card>
              <h3>
                <span
                  style={{ color: '#1677ff', cursor: 'pointer' }}
                  onClick={() => openEditModal(task)}
                >
                  {task.title}
                </span>
              </h3>

              <p>Summary: {task.description}</p>

              <Tag
                color={STATUS_COLORS[task.status]}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/tasks?status=${task.status}`)}
              >
                {task.status}
              </Tag>

              <Tag
                color={PRIORITY_COLORS[task.priority]}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/tasks?priority=${task.priority}`)}
              >
                {task.priority}
              </Tag>

              <p>👤 AssignedTo: {users.find(u => u.id === task.assignedTo)?.name || '-'}</p>
              <p>📁 Project: {projects.find(p => p.id === task.projectId)?.name || '-'}</p>
              <p>👤 Створив: {users.find(u => u.id === task.createdBy)?.name || '—'}</p>
              <p>🛠 Оновив: {users.find(u => u.id === task.updatedBy)?.name || '—'}</p>

              <Popconfirm
                title="Точно видалити задачу?"
                onConfirm={() => dispatch(removeTask(task.id))}
                okText="Так"
                cancelText="Скасувати"
              >
                <Button danger size="small">Видалити</Button>
              </Popconfirm>
            </Card>
          </List.Item>
        )}
      />

      <TaskFormModal
        open={isModalOpen}
        onClose={closeModal}
        initialValues={selectedTask}
        mode={selectedTask ? 'read' : 'create'} 
      />
    </>
  );
};

export default TaskList;
