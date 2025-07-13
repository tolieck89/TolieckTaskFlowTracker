import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import projectsReducer from '../features/projects/projectsSlice';
import usersReducer from '../features/users/userSlice';
import taskReducer from '../features/tasks/TaskSlice'


 export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: taskReducer,
  
 
  },
});

