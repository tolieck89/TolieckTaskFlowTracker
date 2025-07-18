import { Table, Tag } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { selectTasksByProjectId } from '../features/tasks/tasksSelectors';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants/taskOptions';
import {useEffect} from 'react';
import {fetchTasks} from '../features/tasks/TaskSlice'


const ProjectDetailsPage = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
    useEffect(() => {
    dispatch(fetchTasks()); 
  }, [dispatch]);

  const statusFilter = searchParams.get('status');
  const priorityFilter = searchParams.get('priority');

  const allTasks = useSelector((state) =>
    selectTasksByProjectId(state, projectId)
  );

  const filteredTasks = allTasks?.filter((task) => {
    const matchStatus = statusFilter ? task.status === statusFilter : true;
    const matchPriority = priorityFilter ? task.priority === priorityFilter : true;
    return matchStatus && matchPriority;
  }) || [];

  const columns = [
    {
      title: 'Назва задачі',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <span
          style={{ color: '#1677ff', cursor: 'pointer' }}
          onClick={() => navigate(`/tasks/${record.id}`)}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={STATUS_COLORS[status]}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            navigate(`/projects/${projectId}?status=${status}`)
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Пріоритет',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag
          color={PRIORITY_COLORS[priority]}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            navigate(`/projects/${projectId}?priority=${priority}`)
          }
        >
          {priority}
        </Tag>
      ),
    },
  ];

  console.log('projectId:', projectId);
console.log('allTasks:', allTasks);


  return (
    <div style={{ padding: 24 }}>
      <h2>Задачі в проєкті</h2>
      {(statusFilter || priorityFilter) && (
        <div style={{ marginBottom: 16 }}>
          <Tag closable onClose={() => navigate(`/projects/${projectId}`)}>
            Очистити фільтри
          </Tag>
        </div>
      )}
      <Table columns={columns} dataSource={filteredTasks} rowKey="id" />
    </div>
  );
};

export default ProjectDetailsPage;
