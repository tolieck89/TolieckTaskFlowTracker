import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, selectProjectsStatus } from './projectsSelectors';
import { List, Card, Spin, Empty, Popconfirm, Button  } from 'antd';
import { deleteProject } from './projectsSlice';


const ProjectList = () => {
  const projects = useSelector(selectProjects);
  const status = useSelector(selectProjectsStatus);
   const dispatch = useDispatch();

  if (status === 'loading') return <Spin tip="Loading projects..." />;

  if (!projects.length) return <Empty description="There is no projects yet" />;

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={projects}
      renderItem={(project) => (
        <List.Item key={project.id}>
          <Card title={project.name}>
          
            <p>{project.description}</p>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Created: {new Date(project.createdAt).toLocaleString()}
            </p>
              <Popconfirm
        title="Are you shure?"
        onConfirm={() => dispatch(deleteProject(project.id))}
        okText="Yes"
        cancelText="Cancel"
      >
        <Button danger size="small">
          Видалити
        </Button>
      </Popconfirm>
            
          </Card>
        </List.Item>

        
      )}
      
    />
  );
};

export default ProjectList;
