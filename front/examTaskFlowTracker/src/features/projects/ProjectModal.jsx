import { useState } from 'react';
import { Modal, Button } from 'antd';
import ProjectForm from './ProjectForm';

const ProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Створити проєкт
      </Button>

      <Modal
        title="Новий проєкт"
        open={isOpen}
        onCancel={handleClose}
        footer={null} // бо сабміт буде в формі
      >
        <ProjectForm onSuccess={handleClose} />
      </Modal>
    </>
  );
};

export default ProjectModal;
