import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, selectProjectsStatus } from './projectsSelectors';
import { List, Card, Spin, Empty, Popconfirm, Button  } from 'antd';
import { removeProject } from './projectsSlice';
import { useState} from 'react';
import ProjectModal from './ProjectModal';
import ProjectForm from './ProjectForm';
import { useNavigate } from 'react-router-dom';


const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const navigate = useNavigate();

  const status = useSelector(selectProjectsStatus);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (status === 'loading') return <Spin tip="Loading projects..." />;

  if (!projects.length) return <Empty description="There is no projects yet" />;

  const openEditModal = (project) => {
  setSelectedProject(project);
  setIsModalOpen(true);
};
console.log('Всі проєкти з Redux:', projects);


  return (
    <>
   
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={projects}
      renderItem={(project) => (
        <List.Item key={project.id}>
          <Card  title={
    <div onClick={() => navigate(`/projects/${project.id}`)} style={{ cursor: 'pointer' }}>
      {project.title}
    </div>}
          >
            
            <p>{project.description}</p>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Created: {new Date(project.createdAt).toLocaleString()}
            </p>
              <Popconfirm
                title="Are you shure?"
                onConfirm={() => dispatch(removeProject(project.id))}
                okText="Yes"
                cancelText="Cancel"
              >
        <Button danger size="small">
          Видалити
        </Button>
        </Popconfirm>

        <Button  size="small" 
          onClick={() => openEditModal(project)} >
          Редагувати
        </Button>

        </Card>

        </List.Item>
      )}
    />
        <ProjectModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Редагувати проєкт"
    >
     <ProjectForm
  mode="edit"
  initialValues={selectedProject}
  onSuccess={(updatedProject) => {
    setSelectedProject(updatedProject);
    setIsModalOpen(false);
  }}
/>
    </ProjectModal>
    </>
  );
};

export default ProjectList;
