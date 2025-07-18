import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import TaskPage from '../pages/TaskPage';
import UsersPage from '../pages/UsersPage';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      {isAuth ? (
        <>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/projects" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  );
};

export default AppRouter;
