import ProjectList from '../features/projects/ProjectList'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from '../features/projects/projectsSlice'

const ProjectsPage = () => {

    const dispatch = useDispatch();

  useEffect(() => {
  dispatch(fetchProjects());
}, [dispatch]);
return(
<div style={{ padding: 24 }}>
      <h2>Мої проєкти</h2>
      <ProjectList />
    </div>
)
}

export default ProjectsPage;
