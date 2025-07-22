import { Table, Tag } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTasksByProjectId } from '../features/tasks/tasksSelectors';
import { selectUsers } from '../features/users/usersSelector';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants/taskOptions';

const ProjectTasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const statusFilter = searchParams.get('status');
  const priorityFilter = searchParams.get('priority');

  const tasks = useSelector((state) =>
    selectTasksByProjectId(state, projectId)
  );
  const users = useSelector(selectUsers);

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = statusFilter ? task.status === statusFilter : true;
    const matchPriority = priorityFilter ? task.priority === priorityFilter : true;
    return matchStatus && matchPriority;
  });

  const mappedTasks = filteredTasks.map((task) => ({
    ...task,
    assigneeName: users.find((u) => u.id === task.assignedTo)?.name || '',
    creatorName: users.find((u) => u.id === task.createdBy)?.name || '',
  }));

  const columns = [
    {
      title: 'Назва задачі',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],

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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Assignee',
      dataIndex: 'assigneeName',
      key: 'assigneeName',
      sorter: (a, b) => a.assigneeName.localeCompare(b.assigneeName),
      render: (_, record) => record.assigneeName || '—',
    },
    {
      title: 'Creator',
      dataIndex: 'creatorName',
      key: 'creatorName',
      sorter: (a, b) => a.creatorName.localeCompare(b.creatorName),
      render: (_, record) => record.creatorName || '—',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
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
      sorter: (a, b) => a.priority.localeCompare(b.priority),
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

      <Table columns={columns} dataSource={mappedTasks} rowKey="id" />
    </div>
  );
};

export default ProjectTasks;
