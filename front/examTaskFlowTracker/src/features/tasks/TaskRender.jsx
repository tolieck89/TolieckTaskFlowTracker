import { useSelector, useDispatch } from 'react-redux';
import { selectUsers } from '../users/usersSelector'; 
import { Button, Modal, Popconfirm } from 'antd';
import TaskForm from './TaskForm';
import { useState } from 'react';
import { deleteTask } from './TaskSlice'
import RoleAccess from '../users/RoleAccess';




const TaskRender = ({task}) => {

    const {id, title, description, status, priority, assignedTo, projectId} = task;
    const users = useSelector(selectUsers);
    const assignee = users.find(user => user.id === assignedTo);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    const dispatch = useDispatch();


    return (

        <div>
        
        <div>{title}</div>
        <div>{status}</div>
        <div>{priority}</div>
        <div>Виконавець: {assignee ? assignee.name : 'Невідомо'}</div>
        <div>{projectId}</div>
        <div>{title}</div>
        <div>{id}</div>
        <div>{description}</div>
        
        <RoleAccess allowedRoles={['admin', 'user']}>
        <Button size="small" onClick={handleOpen}>
        ✏️ Редагувати
      </Button>
      <Popconfirm
  title="Точно видалити задачу?"
  onConfirm={() => dispatch(deleteTask(task.id))}
  okText="Так"
  cancelText="Скасувати"
>
  <Button danger size="small">
    🗑️ Видалити
  </Button>
</Popconfirm>
      </RoleAccess>


        <Modal
        title="Редагування задачі"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <TaskForm
          initialValues={task}
          mode="edit"
          onSuccess={handleClose}
        />
      </Modal>

        
        </div> )
    }

export default TaskRender;