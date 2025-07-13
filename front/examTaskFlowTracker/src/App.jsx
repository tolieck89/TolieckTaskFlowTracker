import { ConfigProvider } from 'antd'
import { useState, useEffect } from 'react'
import { useAppSelector } from './app/hooks';
import ProjectList from './features/projects/ProjectList';
import ProjectModal from './features/projects/ProjectModal';
import MainLayout from './layout/MainLayout';
import AuthForm from './features/auth/AuthForm'
import UserList from './features/users/UserList';
import TaskFormModal from './features/tasks/TaskFormModal'
import ModalButton from './app/ui/ModalButton'
import TaskForm from './features/tasks/TaskForm';
import ProjectForm from './features/projects/ProjectForm';
import RoleAccess from './features/users/RoleAccess';
import TaskList from './features/tasks/TaskList'


function App() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    // eslint-disable-next-line no-unused-vars
    const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) setAuthModalOpen(true);
  }, [isAuthenticated]);

  return (
    <ConfigProvider
      // theme={{
      //   algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // }}
    >
     
     

        {/* <Button type="primary" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? 'Light theme' : 'Dark theme'}
        </Button> */}
            <MainLayout>
          {isAuthenticated ?(
            <>
      {/* <AddProjectButton /> */}
         <ProjectModal />
  

<ModalButton buttonText="➕ Створити задачу" modalTitle="Нова задача">
  {({ onSuccess }) => (
    <TaskForm onSuccess={() => {
      console.log('OK');
      onSuccess(); // 
    }} />
  )}
</ModalButton>

<RoleAccess allowedRoles={['admin']}>

<ModalButton buttonText="➕ Створити проєкт" modalTitle="Новий проєкт">
  {({ onSuccess }) => (
    <ProjectForm onSuccess={() => {
      console.log('OK');
      onSuccess(); // 
    }} />
  )}
</ModalButton>
</RoleAccess>

        <ProjectList />
              <UserList />
              <TaskFormModal />

        </>
            
    ) : (
              <AuthForm  onSuccess={() => setAuthModalOpen(false)}/>)}

 
            </MainLayout>


     
      <TaskList />

    </ConfigProvider>
  )
}

export default App
