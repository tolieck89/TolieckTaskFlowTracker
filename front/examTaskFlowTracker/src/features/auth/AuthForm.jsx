import { Tabs, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import * as authApi from '../../api/authApi'; 
import {  registerUser, loginUser } from './authSlice';



const AuthForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useAppDispatch();


const handleFinish = async (values) => {
  console.log("🔥 handleFinish called", values);

  if (activeTab === 'login') {
    const result = await dispatch(loginUser(values));
    if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
      onSuccess();
    }
  } else {
    const regResult = await dispatch(registerUser(values));

    if (regResult.meta.requestStatus === 'fulfilled') {
      const loginResult = await dispatch(loginUser({
        email: values.email,
        password: values.password,
      }));

      if (loginResult.meta.requestStatus === 'fulfilled' && onSuccess) {
        onSuccess();
      }
    } else {
      console.error("❌ Реєстрація не пройшла");
    }
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
