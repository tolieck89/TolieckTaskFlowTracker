import { useState } from "react";
import { Button, Modal } from "antd";

const ModalButton = ({ buttonText, modalTitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log(' відкриваємо модалку');
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('закриваємо модалку');
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>{buttonText}</Button>

      <Modal
        title={modalTitle}
        open={isOpen}
        onCancel={closeModal}
        footer={null}
      >
        {typeof children === 'function'
          ? children({ onSuccess: closeModal })
          : children}
      </Modal>
    </>
  );
};

export default ModalButton;