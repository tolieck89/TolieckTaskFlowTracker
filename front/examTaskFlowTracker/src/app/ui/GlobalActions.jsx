import { useState } from 'react';
import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalButton from './ModalButton';
import TaskFormModal from '../../features/tasks/TaskFormModal';
import ProjectForm from '../../features/projects/ProjectForm';

const GlobalActions = () => {

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <Space >
<Button 
  type="primary" 
  icon={<PlusOutlined />} 
  onClick={() => setIsTaskModalOpen(true)}
>
  Створити задачу
</Button>
<TaskFormModal
  open={isTaskModalOpen}  
  onClose={() => setIsTaskModalOpen(false)}
  mode="create"
  initialValues={{}} 
/>
    
  <ModalButton 
  buttonText="Створити проєкт" 
  modalTitle="Новий проєкт"
>
  {({ onSuccess }) => <ProjectForm mode="create" onSuccess={onSuccess} />}
</ModalButton>

    </Space>
  );
};

export default GlobalActions;
