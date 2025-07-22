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

const menu = {
  items: [
    {
      key: 'role',
      label: (
        <Space>
          {getRoleIcon(user?.role)}
          <Text type="secondary">{user?.role}</Text>
        </Space>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      label: 'Налаштування',
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'Вийти',
      icon: <LogoutOutlined />,
    },
  ],
  onClick: ({ key }) => {
    if (key === 'logout') handleLogout()
    if (key === 'settings') handleSettings()
  },
}


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
  <span style={{ cursor: 'pointer', color: '#fff' }}>
    <Space>
      <Avatar icon={<UserOutlined />} />
      {user.name || user.email}
    </Space>
  </span>
</Dropdown>

      )}
      <ProfileModal open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

    </Header>
  ); 
};

export default AppHeader;
