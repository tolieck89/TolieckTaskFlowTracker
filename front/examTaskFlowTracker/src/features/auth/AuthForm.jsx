import { Tabs, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login, register } from './authSlice';
import {addNewUser} from '../users/userSlice'


const AuthForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useAppDispatch();

const handleFinish = (values) => {
  if (activeTab === 'login') {
    dispatch(login(values));
    onSuccess(); 
    form.resetFields();
  } else {
    dispatch(addNewUser({ ...values, role: 'user' }))
      .unwrap()
      .then((createdUser) => {
        dispatch(register(createdUser));
        onSuccess();
        form.resetFields();
      })
      .catch((err) => {
        console.error("Помилка реєстрації:", err);
      });

  }
};

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.TabPane tab="Увійти" key="login">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Увійти</Button>
          </Form.Item>
        </Form>
      </Tabs.TabPane>

      <Tabs.TabPane tab="Реєстрація" key="register">
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="name" label="Ім’я" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Зареєструватися</Button>
          </Form.Item>
          
        </Form>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AuthForm;
