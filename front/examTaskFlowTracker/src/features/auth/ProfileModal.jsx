import { Modal, Form, Input, Select, Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateUser } from './authSlice';
import { Formik } from 'formik';

const ProfileModal = ({ open, onClose }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  return (
    <Modal
      title="Мій профіль"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={{
          name: user.name || '',
          email: user.email || '',
          role: user.role,
        }}
        onSubmit={(values) => {
          dispatch(updateUser(values));
          onClose();
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Ім’я">
              <Input name="name" value={values.name} onChange={handleChange} />
            </Form.Item>

            <Form.Item label="Email">
              <Input name="email" value={values.email} onChange={handleChange} />
            </Form.Item>

            {isAdmin && (
              <Form.Item label="Роль">
                <Select name="role" value={values.role} onChange={(value) => handleChange({ target: { name: 'role', value } })}>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="watcher">Watcher</Select.Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">Зберегти зміни</Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileModal;
