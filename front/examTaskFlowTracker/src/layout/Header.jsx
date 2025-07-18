import { Layout, Dropdown, Menu, Avatar, Space, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CrownOutlined,
  EyeOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import ProfileModal from '../features/auth/ProfileModal';
import { useState } from 'react';
import GlobalActions from '../app/ui/GlobalActions'

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logout());

  const handleSettings = () => {
      setIsProfileOpen(true); 
    console.log('🛠️ Налаштування профілю');
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <CrownOutlined />;
      case 'watcher':
        return <EyeOutlined />;
      default:
        return <TeamOutlined />;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="role" disabled>
        <Space>
          {getRoleIcon(user?.role)}
          <Text type="secondary">{user?.role}</Text>
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={handleSettings}>
        Налаштування
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Вийти
      </Menu.Item>

    </Menu>
  );

  return (
    <Header
      style={{
        color: 'white',
        fontSize: 18,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>TaskFlow — система управління задачами</div>
       <GlobalActions />

      {user && (
        <Dropdown menu={menu} placement="bottomRight">
          <Space style={{ cursor: 'pointer', color: '#fff' }}>
            <Avatar icon={<UserOutlined />} />
            {user.name || user.email}
          </Space>
        </Dropdown>
      )}
      <ProfileModal open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

    </Header>
  ); 
};

export default AppHeader;
