import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';


const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentKey = location.pathname.startsWith('/projects')
    ? 'projects'
    : location.pathname.startsWith('/tasks')
    ? 'tasks'
    : location.pathname.startsWith('/users')
    ? 'users'
    : '';

  const handleClick = ({ key }) => {
    if (key === 'projects') navigate('/projects');
    if (key === 'tasks') navigate('/tasks'); 
    if (key === 'users') navigate('/users');
  };

  return (
    <Menu mode="horizontal" selectedKeys={[currentKey]} onClick={handleClick}>
      <Menu.Item key="projects">Проєкти</Menu.Item>
      <Menu.Item key="tasks">Задачі</Menu.Item>
      <Menu.Item key="users">Користувачі</Menu.Item>
    </Menu>
  );
};

export default Nav;

