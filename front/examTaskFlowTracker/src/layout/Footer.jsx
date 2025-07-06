import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    TaskFlow © {new Date().getFullYear()} — зроблено з ❤️
  </Footer>
);

export default AppFooter;
