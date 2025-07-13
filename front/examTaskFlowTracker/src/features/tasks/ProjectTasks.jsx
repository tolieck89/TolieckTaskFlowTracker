import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksByProjectId } from './tasksSelectors';

const ProjectTasks = ({ projectId }) => {
  const selectFilteredTasks = useMemo(
    () => selectTasksByProjectId(projectId),
    [projectId]
  );

  const tasks = useSelector(selectFilteredTasks);

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  );
};

export default ProjectTasks;
