import { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalButton = ({buttonText, modalTitle, children}) => {

    const [isOpen, setIsOpen] = useState(false);
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
       <>
        <Button
            onClick={openModal}>{buttonText}
        </Button>

        <Modal 
            title={modalTitle}
            open={isOpen}
            onCancel={closeModal}
            footer={null} 
        >
        {typeof children === 'function' ? children({ onSuccess: closeModal }) : children}

        </Modal>
        </>
    )
}

export default  ModalButton;