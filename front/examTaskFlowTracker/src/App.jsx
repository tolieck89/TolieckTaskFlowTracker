import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import  Header   from './layout/Header';
import Nav from './layout/Nav';
import AppFooter from './layout/Footer';
import { useDispatch } from 'react-redux';
import { fetchProjects } from './features/projects/projectsSlice'
import { fetchUsers } from './features/users/userSlice'

const App = () => {
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);
 

  return(
    <>

    <Header />
    <Nav />
    <AppRouter />
    <AppFooter />
    </>
  )
};

export default App;
