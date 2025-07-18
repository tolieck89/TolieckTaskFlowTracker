import AuthForm from '../features/auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const  AuthPage = () => {
      const navigate = useNavigate();

   return (
   <>  <h1>Сторінка авторизації</h1>
     <AuthForm onSuccess={() => {
   navigate('/projects');
}} />
    </>
    )
} ;
export default  AuthPage;
