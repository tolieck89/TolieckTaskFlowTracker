import {Modal} from 'antd'
import TaskForm from './TaskForm';


 const TaskFormModal = ({open, onClose}) => {


return (
<Modal
    title="New task"
    open={open}
    onCancel={onClose}
    footer={null}
>
     <TaskForm onSuccess={onClose} />

</Modal>


);
};


export default TaskFormModal;