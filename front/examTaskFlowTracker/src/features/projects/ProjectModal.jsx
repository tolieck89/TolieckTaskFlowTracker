import { Modal } from 'antd';

const ProjectModal = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title={title}>
      {children}
    </Modal>
  );
};

export default ProjectModal;
