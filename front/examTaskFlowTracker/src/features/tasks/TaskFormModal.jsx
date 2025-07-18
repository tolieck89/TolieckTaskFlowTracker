import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import { Modal, Switch  } from 'antd';
import { useState, useEffect, useRef } from 'react';


const TaskFormModal = ({ open, onClose, mode = 'create', initialValues }) => {
    const [currentMode, setCurrentMode] = useState(mode);
    const formRef = useRef();
    const handleClose = () => {
    formRef.current?.resetFields?.(); 
    onClose(); 
};

  useEffect(() => {
    setCurrentMode(mode); 
  }, [mode]);

  const toggleMode = () => {
    setCurrentMode(prev => (prev === 'read' ? 'edit' : 'read'));
  };
    return (

  <Modal
    destroyOnHidden
        title={
      mode === 'create'
        ? 'Нова задача'
        : mode === 'edit'
        ? 'Редагування задачі'
        : 'Перегляд задачі'
    }
    open={open}
    onCancel={onClose}
    footer={null}
>
    
{mode !== 'create' && (
  <Switch onChange={toggleMode} checked={currentMode === 'edit'} />
)}

   {currentMode === 'read' ? (
  <TaskDetails task={initialValues} />
) : (
<TaskForm
  ref={formRef}
  onSuccess={handleClose} 
  initialValues={initialValues}
  mode={currentMode}
/>

)}
    </Modal>
);
}

export default TaskFormModal;