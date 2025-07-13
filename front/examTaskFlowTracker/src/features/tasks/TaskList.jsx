import { useSelector, useDispatch } from 'react-redux';
import { List, Card, Button, Popconfirm } from 'antd';
import { deleteTask } from './TaskSlice'; 
import { selectTasks } from './tasksSelectors'; 
import TaskFormModal from './TaskFormModal';

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);

  console.log('Задачі:', tasks);

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <Card title={task.title}>
            <p>{task.description}</p>
            <p>📌 Статус: {task.status}</p>
            <p>🔥 Пріоритет: {task.priority}</p>
            <p>👤 AssignedTo: {task.assignedTo}</p>
            <p>📁 Project: {task.projectId}</p>

            <Popconfirm
              title="Точно видалити задачу?"
              onConfirm={() => dispatch(deleteTask(task.id))}
              okText="Так"
              cancelText="Скасувати"
            >
              <Button danger size="small">Видалити</Button>
            </Popconfirm>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
