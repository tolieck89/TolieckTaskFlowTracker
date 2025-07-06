import { Menu } from 'antd';

const Nav = () => (
  <Menu mode="horizontal" defaultSelectedKeys={['projects']}>
    <Menu.Item key="projects">Проєкти</Menu.Item>
    <Menu.Item key="tasks">Задачі</Menu.Item>
    <Menu.Item key="users">Користувачі</Menu.Item>
  </Menu>
);

export default Nav;
