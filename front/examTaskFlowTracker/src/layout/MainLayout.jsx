import { Layout } from 'antd';
import AppHeader from './Header';
import Nav from './Nav';
import AppFooter from './Footer';
import UserList from '../features/users/UserList';

const { Content } = Layout;

const MainLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <AppHeader />
    <Nav />
    <Content style={{ padding: '0 50px' }}>
      {children}
    </Content>
    <AppFooter />
  </Layout>
);

export default MainLayout;
